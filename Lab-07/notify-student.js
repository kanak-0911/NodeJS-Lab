const EventEmitter = require('events');

class NotificationCenter extends EventEmitter {
    constructor() {
        super();
        this.name = 'NotificationCenter';
    }
}

const notify = new NotificationCenter();

notify.on('notification', (user, msg) => {
    console.log(`[${user}] ${msg}`);
});

notify.on('error', (err) => {
    console.log('Notification error:', err.message);
});

notify.on('lowOrder', (items) => {
    console.log(`Low order alert: Only ${items} items remaining.`);
});

notify.emit('notification', 'Priya', 'You have a new message!');
notify.emit('lowOrder', 2);