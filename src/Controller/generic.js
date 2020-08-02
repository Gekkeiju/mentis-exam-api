const Model = require('../Model')

class GenericController {
    async create(req, res, next) {
        const { route } = req.params
        const params = req.body

        const element = await Model[route].create(params)

        res.send(200, element)
        return next()
    }

    async readAll(req, res, next) {
        const { route } = req.params
        const elements = await Model[route].find(null, null,{
            sort: {
                created_at: 1
            }
        })

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