const Question = require('../models/QuestionModel')()

const controller = {}

controller.create = async (req, res) => {
    try {
        await Question.create(req.body)

        res.status(201).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try {
        const result = await Question.find().populate('group')

        res.send(result)
    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Question.findById(id)

        if (result) res.send(result)

        else res.status(404).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveByGroup = async (req, res) => {
    try {
        const result = await Question.find({ group: req.params.groupId }).sort('number')
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

controller.retrieveByGroupAndNumber = async (req, res) => {
    try {
        const result = await Question.findOne({ group: req.params.groupId, number: req.params.number })

        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const id = req.body._id
        const result = await Question.findByIdAndUpdate(id, req.body)

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
        const result = await Question.findByIdAndDelete(id)

        if (result) res.status(204).end()

        else res.status(404).end()

    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
}

module.exports = controller