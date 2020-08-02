module.exports = {
    PORT: process.env.PORT || 7000,
    DB: process.env.DB || 'mongodb+srv://cluster0.ijrt4.gcp.mongodb.net?retryWrites=true&w=majority',
    DB_OPTIONS : {
        dbName: process.env.DB_NAME || 'mentis-exam-db`',
        user: process.env.DB_USER || 'juan-dummy',
        pass: process.env.DB_PASS || 'CkODfcLFfNWgH1xz',
        useNewUrlParser: true,
        useFindAndModify: false
    }
}