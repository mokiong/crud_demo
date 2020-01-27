  const fs = require('fs');
  const _ = require('lodash');
  const childProc = require('child_process');


  // Concatenate root directory path with our backup folder.
  const backupDirPath = ("Z:\\thesis\\backupTest");

  const dbUsername = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;

 
  const dbOptions = {
    user: false,
    pass: false,
    host: 'localhost',
    port: 27017,
    database: 'emms',
    autoBackup: true,
    removeOldBackup: true,
    keepLastDaysBackup: 2,
    autoBackupPath: backupDirPath
  };

  // return stringDate as a date object.
  exports.stringToDate = dateString => {
    return new Date(dateString);
  };

  // Check if variable is empty or not.
  exports.empty = mixedVar => {
    let undef, key, i, len;
    const emptyValues = [undef, null, false, 0, '', '0'];
    for (i = 0, len = emptyValues.length; i < len; i++) {
      if (mixedVar === emptyValues[i]) {
        return true;
      }
    }
    if (typeof mixedVar === 'object') {
      for (key in mixedVar) {
        return false;
      }
      return true;
    }
    return false;
  };

  // Auto backup function
  exports.dbAutoBackUp = () => {
    
    // check for auto backup is enabled or disabled
    if (dbOptions.autoBackup == true) {
      let date = new Date();
      let beforeDate, oldBackupDir, oldBackupPath;

      // Current date
      currentDate = this.stringToDate(date);
      let newBackupDir =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getDate();

      // New backup path for current backup process
      let newBackupPath = dbOptions.autoBackupPath + '\\emms-backupDb-' + newBackupDir;
      // check for remove old backup after keeping # of days given in configuration
      if (dbOptions.removeOldBackup == true) {
        beforeDate = _.clone(currentDate);
        // Substract number of days to keep backup and remove old backup
        beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
        oldBackupDir =
          beforeDate.getFullYear() +
          '-' +
          (beforeDate.getMonth() + 1) +
          '-' +
          beforeDate.getDate();
        // old backup(after keeping # of days)
        oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir;
      }

      // Command for mongodb dump process
      let cmd =
        'mongodump --host ' +
        dbOptions.host +
        ' --port ' +
        dbOptions.port +
        ' --db ' +
        dbOptions.database +
        ' --out ' +
        newBackupPath;
      
        console.log(newBackupPath)
        

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
    }
  };