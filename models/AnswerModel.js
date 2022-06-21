const mongoose = require('mongoose')

module.exports = function() {

    const schema = mongoose.Schema({
        assessment: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'Assessment'
        },
        question: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'Question'
        },
        /**
         * Y = sim
         * N = não
         * X = não se aplica
         * P = adiado
         */
        objective_answer: {
            type: String,
            enum: ['Y', 'N', 'X', 'P'],
            required: true
        },
        comments: {
            type: String,
            required: false        
        },
        datetime: {
            type: Date,
            required: true,
            default: Date.now()
        }
    })

    schema.index({assessment: 1, question: 1}, {unique: true})

    return mongoose.model('Answer', schema, 'answers')
}