const bcrypt = require('bcrypt')

class UserTransformer {

    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        return hash
    }

    async checkPassword(entry, user_password) {
        return bcrypt.compareSync(entry, user_password)
    }

}

module.exports = new UserTransformer()