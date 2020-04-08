const Employee  = require('./model-employee')

class Doctor extends Employee {
    constructor(id, name, position, username, password, is_login) {
        super(id, name, position, username, password, is_login)
    }
}

module.exports = Doctor