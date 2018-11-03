const db = require('../db')

exports.result = (query) => {
    db.query(query, (error, results, fields) => {
        if (error) {
            throw error
        } else {
            return new Promise((resolve, reject) => {
                resolve(results)
            })
        }
    })
}