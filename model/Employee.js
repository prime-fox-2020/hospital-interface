class Employee {
    constructor(id,name, position, username, password) {
      this.id = id
      this.name = name
      this.position = position
      this.username = username
      this.password = password
      this.loggedIn = false
    }
  }

  module.exports = Employee