const fs =require(`fs`);

class Employee {
  constructor(name, position, username, password, login = false) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = login
  }


  
}



module.exports = Employee