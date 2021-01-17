const schedule = require('node-schedule');
const messageRepository = require('../repository/messageRepository.js');

class LookNotificationJob {
  constructor(socketService) {
    this.socketService = socketService;
  }

  run() {
    schedule.scheduleJob('*/60 * * * * *', () => {
      messageRepository.lookForNewNotification().then((rows) => {
        if (rows.length > 0) {
          this.socketService.emit('hello', rows);
          rows.forEach((row) => {
            const pushTimestampDate = new Date(row.push_timestamp);
            this.scheduleNotification(pushTimestampDate, row);
            messageRepository.markAsSchedule(row.id);
          });
        }
      });
    });
  }

  scheduleNotification(timestamp, message) {
    schedule.scheduleJob(timestamp, () => {
      console.log(message);
    });
  }
}

module.exports = LookNotificationJob;
