const QuestionGroup = require('../models/QuestionGroupModel')()

const controller = {}

controller.create = async (req, res) => {
    try{
        await QuestionGroup.create(req.body)

        res.status(201).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieve = async (req, res) => {
    try{
        const result = await QuestionGroup.find()

        res.send(result)
    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.retrieveOne = async (req, res) => {
    try{
        const id = req.params.id
        const result = await QuestionGroup.findById(id)

        if(result) res.send(result)

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try{
        const id = req.body._id
        const result = await QuestionGroup.findByIdAndUpdate(id, req.body)

        if(result) res.status(204).end()

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try{
        const id = req.body._id
        const result = await QuestionGroup.findByIdAndDelete(id)

        if(result) res.status(204).end()

        else res.status(404).end()

    }catch(error) {
        console.log(error)

        res.status(500).send(error)
    }
}

module.exports = controller