const router = require('express').Router();
let Employee = require('../model/employee.model');
let encrypt  = require('../model/aes')
router.route('/').get((req,res) => {
    res.render('employee/addOrEdit', {
        viewTitle : 'Insert Employee'
    })
});


/*/ emploee/1
router.route('/:id').get((req,res) => {
    console.log('hello');
    Employee.findById(req.params.id)
        .then(emp => {
            res.render('employee/addOrEdit', 
            {
            viewTitle : 'Update Employee',
            employee : emp
            }
        )})
        .catch(err => console.error(err));
});*/

router.route('/list').get((req,res) => {
    Employee.find()
        .then(emp => {
            console.log('fuck')
            emp = encrypt.decrypt(emp)
            console.log('hello')
            res.render("employee/list", {list: emp})})
        
        .catch(err => console.error(err))
});

router.route('/add').post((req,res) => {
        
    const Fullname  = encrypt.encrypt(req.body.fullName);
    const Email     = encrypt.encrypt(req.body.email);
    const Mobile    = encrypt.encrypt(req.body.mobile);
    const City      = encrypt.encrypt(req.body.city);

    

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


module.exports = router;