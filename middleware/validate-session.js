const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');


const validateSession = function(req, res, next){
const token = req.headers.authorization;
console.log('token =>', token);

if(!token){

    res.json({auth: 'fail', message: "no token provided" })
} else {

    jwt.verify(token, 'i_am_secret', function(err, decodeToken){
console.log('decodeToken => ', decodeToken);
        if(!err && decodeToken){
            // check the user table for the user is logged in
            User.findOne({
                where: {
                    id: decodeToken.id,
                },
            })
.then(user => {
    // console.log('user => ', user);
    if(!user) throw err;
    // console.log('req => ', req);
    req.user = user;
    // console.log('next => ', next);
   return next();
})
.catch((err) => next());
        } else {
// there was an error or token expired or token to valid
            req.errors = err
            return res.json ({ error: 'Not authirxe '});
        }
})
}
};
module.exports = validateSession;

  // {
    //     throw err
    // }