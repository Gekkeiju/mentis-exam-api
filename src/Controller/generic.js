const Model = require('../Model')
const { GenericTransformer, UserTransformer } = require('../Transformer')

class GenericController {
    async create(req, res, next) {
        const { route, token } = req.params
        const params = req.body

        const { username } = await UserTransformer.verifyToken(token)

        if(username && username.length){
            console.log(`${username} created something!`)
        }

        const element = await Model[route].create(params)

        res.send(200, element)
        return next()
    }

    async readAll(req, res, next) {
        const { route } = req.params

        let elements = await Model[route].find()

        elements = await GenericTransformer.applyQueryString(elements, req.params)

        res.send(elements)
        return next()
    }

    async read(req,res, next) {
        const { route, _id } = req.params

        const element = await Model[route].findOne({ _id })

        res.send(200, element)
        return next()
    }

    async update(req, res, next) {
        const { route, _id } = req.params
        const params = req.body

        const element = await Model[route].findOneAndUpdate(
            { _id },
            params,
            {
                new: true
            }
        )

        res.send(200, element)
        return next()
    }

    async delete(req, res, next) {
        const { route, _id } = req.params
        
        await Model[route].deleteOne({ _id })

        res.send(200, { deleted: true })
        return next()
    }
}

module.exports = new GenericController()