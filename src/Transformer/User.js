const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserTransformer {

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        return hash
    }

    async checkPassword(entry, user_password) {
        return bcrypt.compareSync(entry, user_password)
    }

    async signToken(data) {
        return jwt.sign(data, proces.env.TOKEN_SECRET)
    }

    async verifyToken(token) {
        try {
            return jwt.verify(token, process.env.TOKEN_SECRET)
        }
        catch(err) {
            res.send(403, { message: 'Forbidden' })
            return next(false)
        }
    }

}

module.exports = new UserTransformer()