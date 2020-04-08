class Employee {
    constructor(id, name, username, password, position, loginStatus = 'logout') {
        this.id = id
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.loginStatus = loginStatus
    }
}

module.exports = Employee