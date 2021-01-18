const schedule = require('node-schedule');
const messageRepository = require('../repository/messageRepository.js');
const socketPayloadRepository = require('../repository/socketPayloadRepository.js');

class LookNotificationJob {
  constructor(socketService) {
    this.socketService = socketService;
  }

  run() {
    schedule.scheduleJob('*/10 * * * * *', () => {
      messageRepository.lookForNewNotification().then((rows) => {
        if (rows.length > 0) {
          this.socketService.emit('hello', 'Started');
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
      const io = this.socketService.get();
      socketPayloadRepository.get(message.user_id).then((result) => {
        const socketId = result[0].socket_id;
        io.to(socketId).emit('hello', message);
      });
    });
  }
}

module.exports = LookNotificationJob;
