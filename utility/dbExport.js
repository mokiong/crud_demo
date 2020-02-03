const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const childProc = require('child_process');


const csvWriter = createCsvWriter({
  path  : '../public/generated.csv',
  header: [
    {id: 'Fullname', title: 'Name'},
    {id: 'Email', title: 'Email'},
    {id: 'Mobile', title: 'Mobile'},
    {id: 'City', title: 'City'},
  ],

});

const toCsv = (data) => {
        csvWriter.writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));
            
    }

module.exports.toCsv = toCsv;
 