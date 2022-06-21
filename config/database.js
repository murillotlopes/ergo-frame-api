const mongoose = require('mongoose')
require('dotenv/config')
// ou require('dotenv').config()


module.exports = function() {
    mongoose.connect(process.env.URI_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: false
    })

    mongoose.connection.on('connected', () => {
        console.log('**Mongoose! conectado ao servidor remoto')
    })

    mongoose.connection.on('error', erro => {
        console.error('*** ERRO: Mongoose! não conectado ao servidor remoto. Causa: ' + erro)
    })
}