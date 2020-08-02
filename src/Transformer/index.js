const fs = require('fs')

module.exports = (() => {
    //get files with schema values
    let files = fs.readdirSync(__dirname, (err, files) => {
        if(err) {
            return console.log('Unable to scan directory: ' + err);
        }

        return files
    })
    //remove self from array
    files = files.filter(f => f !== 'index.js')

    const Transformers = {}

    //create transformers
    files.map(f => {
        const transformer = f.replace('.js', '')

        Transformers[`${transformer}Transformer`] = require(`./${transformer}`)
    })

    return Transformers
})()