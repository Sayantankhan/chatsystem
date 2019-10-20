const _ = require("lodash")

const users = [];

module.exports.getUser = (username) => {
    let user =  users.find(user => user.name === username);
    return user;
 }; 

//  {username, id, roomId}
module.exports.registerUser = (data) => {
    let user =  users.find(user => user.name === data.username && user.roomId === data.roomId);
    if(user){
        throw new Error("Username taken");
    }
    else {
        let newUser = {name: data.username, uid: data.id, roomId: data.roomId };
        users.push(newUser);
        return newUser;
    }
};

module.exports.deleteUser = (id) => {
    var user = _.remove(users, (user) => {return user.uid === id;});
    return user;
};

module.exports.getAllUsers = (room) => {
    return _.filter(users, (user) => {return user.roomId === room});
} 