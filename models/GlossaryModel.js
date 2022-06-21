const mongoose = require('mongoose')

module.exports = function() {
    
    const schema = mongoose.Schema({
        entry: {
            type: String,
            required: true
        },
        definition: {
            type: String,
            required: true
        }
    })

    return mongoose.model('Glossary', schema, 'glossaries')
}
