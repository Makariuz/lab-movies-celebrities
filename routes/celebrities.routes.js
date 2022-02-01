// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const Celeb = require('./../models/Celebrity.model')

const router = require("express").Router();



// all your routes here

router.get('/celebrities/new-celebrity', (req,res) => {
    const celeb = new Celeb()
   // console.log(celeb)
   res.render('celebrities/new-celebrity')
   //res.send('test')

})

// route for handling the creating of a new post
router.post('/celebrities/create', async (req, res, next) => {
    req.celeb = new Celeb()
    next()
   
}, savePostAndRedirect('/new-celebrity'))

router.get('/celebrities/celebrities', async (req, res) => {
    const celebs = await Celeb.find()
    res.render('celebrities/celebrities', { celebs })

})


   
function savePostAndRedirect(template) {
    return async ( req,res) => {
    console.log(req.celeb)
    req.celeb.name = req.body.name
    req.celeb.occupation = req.body.occupation
    req.celeb.catchPhrase = req.body.catchPhrase
    try{
    await req.celeb.save()
    res.redirect('/celebrities/celebrities')
    } catch (error){
    res.render(template, {celeb: req.celeb })
    }

    }
}

module.exports = router;