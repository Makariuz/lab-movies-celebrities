const router = require("express").Router();
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const {isLoggedIn} = require('../middleware/guard')


router.get('/create', (req,res) => {
    res.render('./user/new-user')
})

router.post('/new-user', async (req,res) => {
    const user = new User({...req.body})
    const hash = await bcrypt.hash(req.body.password, 10)
    const userpas = req.body.password
    user.password = hash
    try{
        await user.save()
        res.render('./user/profile', { user, userpas })
    } catch (error){
        res.send('error')
    }
})

router.get('/login', (req,res) => {
    res.render('./user/login', {message: 'Please Login'}) 
})

router.post('/login', async (req,res) => {
    const user  = await User.findOne({ email: req.body.email })
    if (user) {
        const isPwCorrect = await bcrypt.compare(req.body.password, user.password)
        if(isPwCorrect) {
            req.session.currentUser = user
            res.render('user/profile', { user })
        } else {
            res.render('user/login', {message: 'The password is incorrect'})
        }
    } else {
        res.render('user/login', {message: 'No user found'})
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})


router.get('/profile', isLoggedIn, (req,res) => {
    res.render('./user/profile')
})


module.exports = router