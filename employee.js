const fs = require('fs');

class Employee {
  constructor(id, name, position, username, password, status) {
    this.id = id;
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
    this.status = status;
  }
}

// class Admin extends Employee {
//   constructor()
//   super()
// }
//
// class Dokter extends Employee {
//   constructor()
//   super()
// }
//
// class Admin extends Employee {
//   constructor() {
//   super() {}
//   }
// }
//
// class OfficeBoy extends Employee {
//   constructor()
//   super()
// }



module.exports = Employee;
