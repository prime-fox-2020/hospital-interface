'use strict'

const {Employee} = require('./index')

class Doctor extends Employee {
    constructor(id, name, position = 'dokter', username, password) {
        super(id, name, position, username, password)
    }
}

module.exports = Doctor