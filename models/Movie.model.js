//  Add your code here
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    plot: String,
    cast: [Object],
})

//export the post model to be used externally 
module.exports = mongoose.model('Movie', movieSchema)