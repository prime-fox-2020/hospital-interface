class Employee {
    constructor(id, name, username, password, position, loginStatus = 'logout') {
        this._id = id
        this.name = name
        this.position = position
        this.username = username
        this._password = password
        this.loginStatus = loginStatus
    }
    get id(){
        return this._id
    }
    set id(param){
        this._id = param
    }
    get password(){
        return this._password
    }
    set password(param){
        this._password = param
    }
}

module.exports = Employee