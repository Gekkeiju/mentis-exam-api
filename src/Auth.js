module.exports = (req, res, next) => {
    const { authorization } = req.headers

    let  token

    if(authorization && authorization.length)
        token = authorization.split(' ')[1]

    if(!token)  
        res.send(401, { message: 'Unauthorized'})

    return !token ? next(false) : next()
}