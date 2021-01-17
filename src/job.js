const schedule = require('node-schedule');

const job = schedule.scheduleJob('*/10 * * * * *', function () {
  console.log('Executed');
});
