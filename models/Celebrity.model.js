//  Add your code here
const mongoose = require('mongoose')

const celebSchema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String,
})

//export the post model to be used externally 
module.exports = mongoose.model('Celeb', celebSchema)