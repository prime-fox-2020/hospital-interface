const Employee = require('./employee');
class Dokter extends Employee {
    constructor(name, username, password, loginstatus) {
        super(name, username, password, 'Dokter', loginstatus);
    }
}

module.exports = Dokter;