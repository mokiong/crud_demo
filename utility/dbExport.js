const fs = require('fs');
const _ = require('lodash');
const childProc = require('child_process');


// Concatenate root directory path with our backup folder.
const backupDirPath = ("C:\\Users\\Cristeta\\Desktop\\moki\\thesis");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const newBackupPath = backupDirPath + '\\report.csv';
const collection    = 'decryptedemployees';


const dbOptions = {
  user: dbUsername,
  pass: dbPassword,
  host: 'localhost',
  port: 27017,
  database: 'emms',
  collection: collection,
  autoBackupPath: backupDirPath
};

    // Command for mongodb dump process
    let cmd =
      'mongoexport --host ' +
      dbOptions.host +
      ' --port ' +
      dbOptions.port +
      ' --db ' +
      dbOptions.database +
      ' --collection ' +
      dbOptions.collection +
      ' --username ' +
      dbOptions.user +
      ' --password ' +
      dbOptions.pass +
      ' --out ' +
      newBackupPath;
    
    //execute command in shell
    const toCsv = () => {
        // if backup exist delete it 
        if(fs.existsSync(newBackupPath)){
        childProc.exec('rd/s/q ' + newBackupPath,(err,stdout,stderr) =>{
            console.log('succesfully deleted old report!')
        })
        childProc.execSync(cmd,{
            cwd: 'C:\\Program Files\\MongoDB\\Server\\4.2\\bin'
        }) 
        }
        //if back up doesnt exist
        else {                     
        childProc.execSync(cmd,{
            cwd: 'C:\\Program Files\\MongoDB\\Server\\4.2\\bin'
        })
        console.log('Succesfully created backup!')
        }    
    }

module.exports.toCsv = toCsv;
