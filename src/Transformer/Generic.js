class GenericTransformer {
    async applyQueryString(elements, params) {
        const {
            sort = 'created_at',
            direction = 'asc'
        } = params

        elements = elements.sort((a, b) => {
            let sort_value

            if(typeof a[sort] === 'string')
                sort_value = (direction === 'asc')
                    ? a[sort].localeCompare(b[sort]) 
                    : b[sort].localeCompare(a[sort])
            else
                sort_value = (direction === 'asc')
                    ? a[sort] - b[sort]
                    : b[sort] - a[sort]

            return sort_value
        })

        return elements
    }
}

module.exports = new GenericTransformer()