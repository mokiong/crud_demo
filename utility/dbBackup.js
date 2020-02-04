  const fs = require('fs');
  const _ = require('lodash');
  const childProc = require('child_process');


  // Concatenate root directory path with our backup folder.
  const backupDirPath = process.env.BACKUP_PATH;
  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;

 
  const dbOptions = {
    user: false,
    pass: false,
    host: 'localhost',
    port: 27017,
    database: 'emms',
    collection: 'employees',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: backupDirPath
  };


  // Auto backup function
  exports.dbAutoBackUp = () => {
      
      const newBackupPath = backupDirPath + '\\EmmsBackupDb';
      // Command for mongodb dump process
      let cmd = `mongodump --host ${dbOptions.host} --port ${dbOptions.port} --collection ${dbOptions.collection} --db ${dbOptions.database} --out ${newBackupPath}`
            

      //execute command in shell

      // if backup exist delete it 
      if(fs.existsSync(newBackupPath)){
        childProc.exec('rd/s/q ' + newBackupPath,(err,stdout,stderr) =>{
          console.log('succesfully deleted old backup!')
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
    };
