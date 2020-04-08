class Employee {
    constructor(id, name, position, username, password, is_login = false) {
        this.id = id
        this.name = name
        this.position = position
        this.username = username
        this.password = password
        this.is_login = is_login
    }
}



module.exports = Employee