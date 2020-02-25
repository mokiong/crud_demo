const csv   = require('csv-parser');
const fs              = require('fs');
const path            = require('path');

// path to csv file ---- static public files
const pathCsv = path.join(__dirname,'/../public');

// import utility 
const aes = require('../model/aes')

// import model
const Employee  = require('../model/employee.model');


const csvImport = (csvFile) => {
  
  fs.createReadStream(csvFile)
  .pipe(csv({
    strict : true
  }))
  .on('data', (data) => {

    const newEmp = new Employee({
      Fullname  : aes.encrypt(data.Name),
      Email     : aes.encrypt(data.Email), 
      Mobile    : data.Mobile,
      City      : aes.encrypt(data.City)
    })
    newEmp.save()
    
  })
  .on('end', () => {
    console.log('Succesfully imported csv file')  
  });
}

module.exports = {
    csvImport
}