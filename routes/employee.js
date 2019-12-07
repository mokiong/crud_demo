const router = require('express').Router();
let Employee = require('../model/employee.model');

router.route('/').get((req,res) => {
    res.render('employee/addOrEdit', {
        viewTitle : 'Insert Employee'
    })
});


// emploee/1
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
});

router.route('/list').get((req,res) =>{
    Employee.find()
        .then(emp => res.render("employee/list", {list: emp}))
        .catch(err => console.error(err))
});

router.route('/add').post((req,res) => {
        console.log('hi');
    const Fullname = req.body.fullName;
    const Email = req.body.email;
    const Mobile = req.body.mobile;
    const City = req.body.city;

    const newEmp = new Employee({
        Fullname: Fullname,
        Email: Email,
        Mobile: Mobile,
        City: City
    });

    newEmp.save()
        .then((emp) => {
            console.log(`Added ${emp.Fullname}`);
            res.redirect('list');
        })
        .catch(err => console.error(err));

});


module.exports = router;