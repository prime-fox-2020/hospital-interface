const Employee = require('./employee')

class Admin extends Employee{
    constructor(id, name, position, username, password, loginStatus){
        super(id, name, position, username, password, loginStatus)
    }
}

module.exports = Admin