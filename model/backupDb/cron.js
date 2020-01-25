const CronJob = require('cron').CronJob;
const Cron = require('./dbbackup.js');

new CronJob(
  '1 * *  * *',
  Cron.dbAutoBackUp(),
  null,
  true,
  'Asia/Manila'
);
