const cron = require('node-cron');
const dbBackup = require('./dbbackup.js');

const sched = '1 * * * * *';
cron.schedule(sched, () => {
  dbBackup.dbAutoBackUp();
  console.log('running every minute!');
});

const valid = cron.validate(sched);
console.log(valid);