const Employee  = require('./model-employee')

class Admin extends Employee {
    constructor(id, name, position, username, password, is_login) {
        super(id, name, position, username, password, is_login)
    }
}

module.exports = Admin