const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
    make:{
        type: String,
        require: true,
    },
    model:{
        type: String,
        require: true,
    }, 
    year:{
        type: Number,
        require: true,
    },
})

module.exports = mongoose.model('Car', carSchema)