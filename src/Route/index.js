const user = require('../Controller/user')
const generic = require('../Controller/generic')
const checkAuth = require('../Auth')

module.exports = (server) => {
    /*
    * generic */
    server.get('/:route', generic.readAll)
    server.get('/:route/:id', generic.read)

    server.post('/:route', generic.create)

    server.put('/:route/:id', generic.update)

    server.del('/:route/:id', generic.delete)

    /*
    * user */
    // server.get('/user', user.readAll)

    server.post('/create_account', user.create)
    server.post('/login', user.login)
    server.post('/logout', user.logout)
}