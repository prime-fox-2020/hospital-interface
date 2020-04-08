'use strict'

const {Employee} = require('./index')

class Receptionist extends Employee {
    constructor(id, name, position = 'receptionist', username, password) {
        super(id, name, position, username, password)
    }
}

module.exports = Receptionist