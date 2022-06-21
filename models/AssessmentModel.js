const mongoose = require('mongoose')

module.exports = function () {

    const schema = mongoose.Schema({
        datetime: {
            type: Date,
            required: true,
            default: Date.now()
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        },
        user: {
            type: mongoose.ObjectId,
            required: true,
            ref: 'User'
        },
        closed: {
            type: Boolean,
            required: false,
            default: false
        }
    })

    return mongoose.model('Assessment', schema, 'assessments')
}