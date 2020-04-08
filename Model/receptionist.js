const Employee = require('./employee')

class Receptionist extends Employee{
    constructor(id, name, position, username, password, loginStatus){
        super(id, name, position, username, password, loginStatus)
    }
}

module.exports = Receptionist