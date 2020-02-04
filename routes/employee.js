const router    = require('express').Router();
const Employee  = require('../model/employee.model');
const DecEmp    = require('../model/decEmp');
const Aes       = require('../model/aes');
const dbExport  = require('../utility/dbExport');

const Emailer   = require('../utility/mailer');

router.route('/').get((req,res) => {
    res.render('employee/addOrEdit', {
        viewTitle : 'Insert Employee'
    })
});

// export report to csv file 
router.route('/to-csv').get((req,res) => {
    // decrypts every field and saves it to new database
        Employee.find()
            .then(emp => {
                decElem = Aes.decrypt(emp)
                emp.forEach(element => {    
                    const decrpytedEmployee = new DecEmp({
                        _id         : element._id,
                        Fullname    : element.Fullname,
                        Email       : element.Email,
                        Mobile      : element.Mobile,
                        City        : element.City,
                    });
            
                    decrpytedEmployee.save()
                        .then(() => 'success')
                        .catch(err => console.error(err));
                });
                dbExport.toCsv(decElem);
            })
            .catch(err => console.error(err));

    DecEmp.collection.deleteMany({});
    Emailer.sendMail();
    Employee.find()
        .then(emp => {
            emp = Aes.decrypt(emp)            
            res.render("employee/list", {list: emp})
        })        
        .catch(err => console.error(err))
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
    const Mobile    = Aes.encrypt(req.body.mobile);
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