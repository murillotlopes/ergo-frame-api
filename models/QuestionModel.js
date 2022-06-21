const mongoose = require('mongoose')

module.exports = function () {

    const schema = mongoose.Schema({

        number: {
            type: Number,
            required: true
        },

        enunciation: {
            type: String,
            required: true
        },
        group: {
            type: mongoose.ObjectId,
            ref: 'QuestionGroup',
            required: true
        },
        glossaryItem: {
            type: [],
            required: false
        }
    })

    schema.index({ group: 1, number: 1 }, { unique: true })

    return mongoose.model('Question', schema, 'questions')

}