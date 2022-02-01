// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model')
const Celeb = require('./../models/Celebrity.model');
const res = require("express/lib/response");
// all your routes here

router.get('/movies/new-movies', async (req,res) => {
   const celebs = await Celeb.find()
   res.render('movies/new-movies', {celebs})

})


router.post('/movies/create', async (req, res, next) => {
   req.movie = new Movie()
   setTimeout(() => {res.send('nice')}, 100);
   next()

}, savePostAndRedirect('/new-movies'))

function savePostAndRedirect(template) {
    return async ( req,res) => {
    console.log(req.movie)
    req.movie.title = req.body.title
    req.movie.genre = req.body.genre
    req.movie.plot = req.body.plot
    try{
    await req.movie.save()
    res.redirect('/movies/movies')
    } catch (error){
    res.render(template, {movie: req.movie })
    }

    }
}

router.get('/movies/movies', async (req, res) => {
   const movies = await Movie.find()

  res.render('movies/movies', { movies })

})

router.get('/movies/movies/:id', async (req, res) => {
   const movie = await Movie.findById()

  res.render('movies/movies', { movie })

})

module.exports = router;