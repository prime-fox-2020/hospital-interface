const Employee = require('./employee')

class Dokter extends Employee{
    constructor(id, name, position, username, password, loginStatus){
        super(id, name, position, username, password, loginStatus)
    }
}

module.exports = Dokter