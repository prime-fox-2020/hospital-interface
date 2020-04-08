const fs = require('fs')

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
    this.status = false
  }

  static readFileEmployee(callback) { // sduh jadi arr of objs
    fs.readFile('./employee.json', (err, data) => {
      if (err) throw err ;
      callback(JSON.parse(data))
    })
  }

  static writeFileEmployee(data, callback) {
    fs.writeFile('./employee.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    })
  }

  static modelRegister(username, password, position, callback1){
    this.readFileEmployee((data) => {
      let employeeData = new Employee(username, password, position)
      data.push(employeeData)
      this.writeFileEmployee(data, () => {})
      let result = `save data success ${JSON.stringify(employeeData)} Total employee : ${data.length}`
      callback1(result)
    })
  }

  static modelLogin(username, password, callback2){
    this.readFileEmployee((data) => {
      let counter = 0
      for (let i in data) {
        if (username == data[i].username && password == data[i].password) {
        data[i].status = true
        this.writeFileEmployee(data, () => {})
        var result = `user ${username} logged in successfully`
        } else {
        counter++
        }
        callback2(result, null)
      }
      if (counter > 0) {
        let resultError = `username / password salah`
        callback2(null,resultError)
      }
    })
  }

  static modelLogout(callback3){
    this.readFileEmployee((data) => {
        data.status = false
        data = []
        this.writeFileEmployee(data, () => {})
        var result = `user logged out successfully`
        callback3(result)
    })
  }

}

class Dokter extends Employee{
    constructor(position){
        this.position = position
    }
}

class Admin extends Employee{
    constructor(position){
        this.position = position
    }
}

class Receptionist extends Employee{
    constructor(position){
        this.position = position
    }
}

module.exports = Employee;
