const EventEmitter = require('events');

class OrderTracker extends EventEmitter {
    constructor() {
        super();
    }

    createOrder(orderId, customer) {
        this.emit('orderPlaced', orderId, customer);

        setTimeout(() => {
            this.emit('orderPrepared', orderId, customer);
        }, 1000);

        setTimeout(() => {
            this.emit('orderDelivered', orderId, customer);
        }, 2000);
    }
}

const tracker = new OrderTracker();

// orderPlaced listeners
tracker.on('orderPlaced', (orderId, customer) => {
    console.log(`Customer Notification: Order ${orderId} placed by ${customer}.`);
});

tracker.on('orderPlaced', (orderId) => {
    console.log(`Internal Log: Order ${orderId} has been placed.`);
});

// orderPrepared listeners
tracker.on('orderPrepared', (orderId, customer) => {
    console.log(`Customer Notification: Order ${orderId} is being prepared.`);
});

tracker.on('orderPrepared', (orderId) => {
    console.log(`Kitchen Log: Order ${orderId} is ready for delivery.`);
});

// orderDelivered listeners
tracker.on('orderDelivered', (orderId, customer) => {
    console.log(`Customer Notification: Order ${orderId} delivered to ${customer}.`);
});

tracker.on('orderDelivered', (orderId) => {
    console.log(`Delivery Log: Order ${orderId} delivery completed.`);
});

// firstOrderBonus listener
tracker.once('firstOrderBonus', (customer) => {
    console.log(`Bonus: First order bonus applied to ${customer}.`);
});

// error listener
tracker.on('error', (err) => {
    console.log(`Order Tracker Error: ${err.message}`);
});

// Start order
tracker.emit('firstOrderBonus', 'Priya');
tracker.createOrder('ORD101', 'Priya');