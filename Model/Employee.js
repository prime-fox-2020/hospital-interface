const Dokter = require('./Dokter')
const Admin = require('./Admin')
const Receptionist = require('./Receptionist')
const OfficeBoy = require('./OfficeBoy')
const fs = require('fs')

class Employee {
  constructor([name, username, password, position]) {
    this._name = name
    this._position = this.positionSelector(position)
    this._username = username
    this._password = password
    this._isLogin = false
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
    this._position = this.positionSelector(position)
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
  get isLogin() {
    return this._isLogin
  }
  set isLogin(bool) {
    this._isLogin = bool
  }

  positionSelector(position) {
    switch (position) {
      case 'doktor': return new Dokter(); break
      case 'admin': return new Admin(); break
      case 'office-boy': return new OfficeBoy(); break
      case 'receptionist': return new Receptionist(); break
    } 
  }


  static login(params, callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
        const findUserLogin = employees.findIndex(user => user._isLogin === true)
        const userIndex = employees.findIndex(user => user._username === params[0] && user._password === params[1])
        if (findUserLogin < 0) {
          if (userIndex < 0) {
            callback(null, `username / password wrong`)
          } else {
            employees[userIndex]._isLogin = true
            fs.writeFile('./data/employee.json', JSON.stringify(employees, null, 2), err => {
              if (err) {
                callback(err, `Cant save data employee`)
              } else {
                callback(null, `User ${params[0]} logged in successfully`)
              }
            })
          }
        } else {
          callback(null, `${employees[findUserLogin]._name} is still login. He / She need to logout first!`)
        }
      }
    })
  }

  static createOne(params, callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
        employees.push(new Employee(params))
        fs.writeFile('./data/employee.json', JSON.stringify(employees, null, 2), err => {
          if (err) {
            callback(err, `Cant save data`)
          } else {
            callback(null, `Save data success { username: ${params[1]}, role: ${params[3]} }. Total employees: ${employees.length}`)
          }
        })
      }
    })
  }
}

module.exports = Employee