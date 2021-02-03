const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', function (req, res){


const username = req.body.username;
const password = req.body.password;

User.create({
    username: username,
    passwordhash: bcrypt.hashSync(password, 13),

})
.then(function creatSuccess(user){
        let token = jwt.sign({id: user.id }, 'i_am_secret', 
        {expiresIn: 60 * 60 * 24,
        });

        res.json({
        userInfo: user,
        sessionToken: token,
    });
})
.catch(err=> res.status(500).json({ error: err}));

});

router.post('/login', function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    
    User.findOne({
        where: {
            username: username
        }
    }).then (function loginSuccess(user){
            if (user){
               
// We found a user match

// Does the users password get validated
bcrypt.compare(password, user.passwordhash, function ( err, matches){

    if (matches){
        let token = jwt.sign({id: user.id }, 'i_am_secret', 
        {expiresIn: 60 * 60 * 24,
        });

        res.json({
        userInfo: user,
        sessionToken: token,
    });
    } else {
        res.json({error: 'error again'})
    }
});
            }else {
// no user match
            res.json({error: 'User aint there'});

            }
        }
    )
});

module.exports = router;