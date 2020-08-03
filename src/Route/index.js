const user = require('../Controller/user')
const generic = require('../Controller/generic')
const checkAuth = require('../Auth')

module.exports = (server) => {
    /*
    * generic */
    server.get('/:route', generic.readAll)
    server.get('/:route/:id', generic.read)

    server.post('/:route', checkAuth, generic.create)

    server.put('/:route/:id', checkAuth, generic.update)

    server.del('/:route/:id', checkAuth, generic.delete)

    /*
    * user */
    // server.get('/user', user.readAll)

    server.post('/create_account', user.create)
    server.post('/login', user.login)
    server.post('/logout', user.logout)
}