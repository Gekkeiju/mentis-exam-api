const restify = require('restify')
const mongoose = require('mongoose')
const corsMiddleware = require('restify-cors-middleware')

const {
    PORT,
    DB,
    DB_OPTIONS
} = require('./config')
const routes = require('./src/Route')

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

const DB_CALLBACK = (err) => {
    if(!err)
        console.log('DB SUCCESS!!!')
}

/*
* Database Connection */
mongoose.connect(DB, DB_OPTIONS, DB_CALLBACK)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))

/*
* Restify Server */
const server = restify.createServer()

//cors
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})
server.pre(cors.preflight)
server.use(cors.actual)

//parsers
server.use(restify.plugins.bodyParser({
    mapParams: true
}))
server.use(restify.plugins.queryParser({
    mapParams: true
}))

//custom
server.use((req, res, next) => {
    let { params } = req

    const {
        route,
        id
    } = params

    if(route)
        params.route = route.capitalizeFirstLetter()

    if(id)
        params._id = id

    req.params = params

    return next()
})

/*
* routes */
routes(server)

server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url)
})

/*
* Graceful termination */
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated.')
        mongoose.connection.close()
        process.exit(0)
    })
})