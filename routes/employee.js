const router     = require('express').Router();
const fs         = require('fs');
const path       = require('path');
// import models
const Employee  = require('../model/employee.model');

// import utility
const Aes           = require('../model/aes');
const { toCsv }     = require('../utility/dbExport');
const { csvImport } = require('../utility/Import');
const { sendMail }  = require('../utility/mailer');


router.route('/').get((req,res) => {
    res.render('employee/addOrEdit', {
        viewTitle : 'Insert Employee'
    })
});

router.route('/import-csv').post( (req,res) => {
    
    const pathPublic = path.join(__dirname,'/../public/');

    req.pipe(req.busboy)
    .on('file', (fieldname, file, filename) => {
        if(filename.substring(filename.length, filename.length-3) != 'csv'){
            res.send('must be csv file')
        } else {
            console.log("Uploading: " + filename);
            var fstream = fs.createWriteStream(pathPublic + 'csvToImport.csv');
            file.pipe(fstream)
            .on('close', () => {
                csvImport(pathPublic + '/csvToImport.csv')
                res.redirect('back');
            });
        }
    });
});

// export report to csv file 
router.route('/to-csv').get((req,res) => {
    // decrypts every field and saves it to new database
        Employee.find()
            .then(emp => {
                emp = Aes.decrypt(emp);
                toCsv(emp);
                res.render("employee/list", {list: emp});
            })
            .catch(err => console.error(err));

})

//delete user
router.route('/delete/:id').get((req,res) => {
    Employee.findByIdAndDelete(req.params.id)                // gets id directly from url 
        .then(emp => {
            console.log('succesfully deleted user')
    })
        .catch(err => res.status(400).json('Error: ' + err));
    
        Employee.find()
        .then(emp => {
            emp = Aes.decrypt(emp)            
            res.render("employee/list", {list: emp})
        })        
        .catch(err => console.error(err))
});

//update user
router.route('/edit/:id').post((req,res) => {

});

/*/update user
router.route('/update/:id').get((req,res) => {
    Employee.findById(req.params.id)
        .then(emp => {
            res.render('employee/addOrEdit', 
            {
            viewTitle : 'Update Employee',
            employee : emp
            })
            emp.Fullname  = Aes.encrypt(req.body.fullName);
            emp.Email     = Aes.encrypt(req.body.email);
            emp.Mobile    = Aes.encrypt(req.body.mobile);
            emp.City      = Aes.encrypt(req.body.city);
            emp.save()
                .then(() => res.json('Employee updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
    })
        .catch(err => console.error(err));
});*/

//get all users
router.route('/list').get((req,res) => {
    Employee.find()
        .then(emp => {
            emp = Aes.decrypt(emp)            
            res.render("employee/list", {list: emp})
        })        
        .catch(err => console.error(err))
});

// add user
router.route('/add').post((req,res) => {
        
    const Fullname  = Aes.encrypt(req.body.fullName);
    const Email     = Aes.encrypt(req.body.email);
    const Mobile    = req.body.mobile;
    const City      = Aes.encrypt(req.body.city);
 
    

    const newEmp = new Employee({

        Fullname: Fullname,
        Email   : Email,
        Mobile  : Mobile,
        City    : City
    });

    newEmp.save()
        .then((emp) => {
            console.log(`Added ${emp.Fullname}`);
            res.redirect('list');
        })
        .catch(err => console.error(err));

});

function updateRecord(req,res) {
    Employee.findOneAndUpdate({_id: req.body._id}, req.body,{new : true},(err,doc) => {
        if (!err) {
            res.redirect('list')
        }
    })
}

module.exports = router;