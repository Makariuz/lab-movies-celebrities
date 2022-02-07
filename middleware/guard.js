const session = require('express-session')

function isLoggedIn(req, res, next){ 
    if(!req.session.currentUser) {
    return res.render('./user/login', { message: 'you are not logged in'})
}  

next()
}

function isLoggedOut(req,res,next){}

//named exporting {}
module.exports = { isLoggedIn,  isLoggedOut}