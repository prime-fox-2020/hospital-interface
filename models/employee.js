class Employee {
    constructor(id, name, username, password, position, loginStatus = false) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.password = password;
        this.position = position;
        this.loginStatus = loginStatus;
    }
}

module.exports = Employee;