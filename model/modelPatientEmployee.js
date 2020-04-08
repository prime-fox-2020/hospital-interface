class Patient {
    constructor(id, name, diagnosis) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }
}
  
class Employee {
    constructor(name, position, username, password, login_status) {
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.login_status = login_status
    }
}

module.exports = {
    Patient,
    Employee
}