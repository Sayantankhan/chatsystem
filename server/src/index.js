const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

const router = require('./route');
const users = require('./user');

const keys = require('./keys');

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client = new kafka.KafkaClient({kafkaHost: keys.kafka.kafkaHost}),
    producer = new Producer(client),
    km = new KeyedMessage('key', 'message');

var mongoose = require('mongoose');
const db = mongoose.connection;

const ChatModel = require('./model/chatmodel');

mongoose.connect(keys.mongo.mongoHost, {useNewUrlParser: true});

db.on("connected", ()=>{console.log(" Database Connection Successful ");});
db.on("error", (err) => {throw new Error(err);})
db.on("disconnected", ()=>{console.log(" Database disconnected ");});

var emoji = require('node-emoji');

const port = process.env.port || 4000;

app.use(router);

producer.on('ready', function () {
    console.log('connected with kafka');
});

producer.on('error', function (err) {
    console.log(err);
});

io.on('connection', (socket) => {
    var room;
    console.log('User connected');

    socket.on('joining', (data, callback) => {
        console.log(data);
        room = data.room;
        socket.join(data.room);
        try{
            io.to(room).emit('nuebe',users.registerUser({username: data.name, id: socket.id, roomId: data.room}));
            io.to(room).emit('userList', users.getAllUsers(room));
        }catch(err){
            callback({error : err});
        }
    });

    socket.on('message', (message) => {
        console.log(message);
        new ChatModel({name : message.name, chatMessage : message.message, roomId: room}).save();
        producer.send([{topic : keys.kafka.topic, messages : JSON.stringify(message), partition: 0 }],(err, data) => {
           console.log(data) ;
        })
        io.to(room).emit('brodcastMessage', message);
    });

    socket.on('listUser', (room) => {
        io.to(room).emit('userList',users.getAllUsers(room));
    })

    socket.on('disconnect', function () {
       console.log('User disconnnected');
       let userLists = users.deleteUser(socket.id);
       io.to(room).emit('deletedUser',userLists[0]); 
       io.to(room).emit('userList', users.getAllUsers(room));                                                                                
    });
});

process.on('SIGINT', function() { 
    db.close(() => {
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    })
})

server.listen(port, ()=> {
    console.log(`listening on *:${port}`)
});