const User = require('../models/UsersModel')()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const controller = {}

controller.create = async (req, res) => {
    try {

        if (!req.body.password) return res.status(500).send({
            error: 'Path "password" is required'
        })

        req.body.password_hash = await bcrypt.hash(req.body.password, 12)

        delete req.body.password

        await User.create(req.body)

        res.status(201).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try {
        let result

        if (req.authenticatedId === 'Id do usuário admin')
            result = await User.find()
        else
            result = await User.find({ _id: req.authenticatedId })

        // const result = await User.find()
        res.send(result)

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        let result
        const id = req.params.id

        if (req.authenticatedId === 'Id do usuário admin' || req.authenticatedId === id)
            result = await User.find(id)

        else
            result = null


        if (result) res.send(result)

        else res.status(404).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {

        if (req.body.password) {

            req.body.password_hash = await bcrypt.hash(req.body.password, 12)
            delete req.body.password
        }

        const id = req.body._id
        const result = await User.findByIdAndUpdate(id, req.body)

        if (result) res.status(204).end()

        else res.status(404).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const id = req.body._id
        const result = await User.findByIdAndDelete(id)

        if (result) res.status(204).end()

        else res.status(404).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email }).select('password_hash')
        // console.log(user)
        if (!user) {
            res.status(401).end()

        } else {
            bcrypt.compare(req.body.password, user.password_hash, function (err, result) {

                //console.log(result)

                if (result) {

                    const token = jwt.sign({
                        id: user._id
                    }, process.env.SECRET, {
                        expiresIn: 3600
                    })

                    res.json({
                        auth: true, token
                    })

                } else {
                    res.status(401).end()
                }
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

controller.logout = async (req, res) => {

    res.send({
        auth: false,
        token: null
    })
}

module.exports = controller