'use strict'

const {Employee} = require('./index')

class Admission extends Employee {
    constructor(id, name, position = 'admin', username, password) {
        super(id, name, position, username, password)
    }
}

module.exports = Admission