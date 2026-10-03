const EventEmitter = require('events');
const app = new EventEmitter();

app.once('firstLogin', () => {
    console.log('Welcome bonus applied!');
});

app.on('login', () => {
    console.log('Login successful.');
});

app.emit('login');
app.emit('login');
app.emit('firstLogin');
app.emit('firstLogin');