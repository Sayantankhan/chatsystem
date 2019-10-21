var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatModel = new Schema({
    name: String,
    chatMessage: String,
    roomId: String,
    date: Date
});

var chatModel = mongoose.model('ChatModel', ChatModel );
module.exports = chatModel;