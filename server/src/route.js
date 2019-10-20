const express = require('express');
const router = express.Router();
const users = require('./user');

router.get("/",(req,res) => {
    let user = users.registerUser({username: 'Sayantan',id : 'A_zzdsflawoefapfgo', roomId: '3216s1a65165sa+f51'})
    res.send(user);
});


module.exports = router;

