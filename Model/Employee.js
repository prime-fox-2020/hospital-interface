
class Employee {
  constructor(name, position, username, password) {
    this._name = name
    this._position = position
    this._username = username
    this._password = password

  }

  get name() {
    return this.name
  }
  set name(name) {
    this._name = name
  }
  get position() {
    return this._position
  }
  set position(position) {
    this._position = position
  }
  get username() {
    return this._username
  }
  get password() {
    return this._password
  }
  set password(pwd) {
    this._password = pwd
  }

  static createOne(name, position, username, password) {
    return new Employee(name, position, username, password)
  }
}

module.exports = Employee