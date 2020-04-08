const Employee = require('./employee');
class Other extends Employee {
    constructor(id, name, username, password, loginstatus) {
        super(id, name, username, password, 'other', loginstatus);
    }
}

module.exports = Other;