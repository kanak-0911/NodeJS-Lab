const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('error', (err) => {
    console.log('Handled gracefully:', err.message);
});

emitter.emit('error', new Error('Something broke!'));