class Employee {
    constructor(id, name, username, password, position, loginStatus) {
        this.id = id
        this.name = name
        this.username = username
        this.password = password
        this.position = position
        this.loginStatus = loginStatus
    }
}

class Admin extends Employee {
    constructor(id, name, username, password, position, loginStatus) {
        super(id, name, username, password, position, loginStatus)
    }
}

class OfficeBoy extends Employee{
    constructor(id, name, username, password, position, loginStatus) {
        super(id, name, username, password, position, loginStatus)
    }
}

class Dokter extends Employee{
    constructor(id, name, username, password, position, loginStatus) {
        super(id, name, username, password, position, loginStatus)
    }
}

class Receptionist extends Employee{
    constructor(id, name, username, password, position, loginStatus) {
        super(id, name, username, password, position, loginStatus)
    }
}

module.exports = {Employee, Admin, OfficeBoy, Dokter, Receptionist}