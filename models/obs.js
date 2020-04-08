'use strict'

const {Employee} = require('./index')

class OfficeBoy extends Employee {
    constructor(id, name, position = 'officeboy', username, password) {
        super(id, name, position, username, password)
    }
}

module.exports = OfficeBoy