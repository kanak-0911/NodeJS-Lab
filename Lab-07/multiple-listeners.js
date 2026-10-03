const EventEmitter = require('events');
const order = new EventEmitter();

order.on('newOrder', () => {
    console.log('Kitchen: Preparing order');
});

order.on('newOrder', () => {
    console.log('Billing: Generating invoice');
});

order.on('newOrder', () => {
    console.log('SMS: Order confirmation sent');
});

order.on('newOrder', () => {
    console.log('Loyalty Points: Points added to customer account');
});

order.emit('newOrder');