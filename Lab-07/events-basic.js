const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.emit('greet');

emitter.on('greet', () => {
    console.log('Hello, Everyone!');
});