const Dokter = require('./Dokter')
const Admin = require('./Admin')
const Receptionist = require('./Receptionist')
const OfficeBoy = require('./OfficeBoy')
const fs = require('fs')

class Employee {
  constructor([name, position]) {
    this._name = name
    this._position = this.positionSelector(position)
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
      case 'dokter': return new Dokter(); break
      case 'admin': return new Admin(); break
      case 'office-boy': return new OfficeBoy(); break
      case 'receptionist': return new Receptionist(); break
    } 
  }

  static findAll(callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
          .map(el => {
            return new Employee([el.name, el.position])
          })
        callback(null, employees)
      }
    })
  }

  static login([username, password], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
        const findUserLogin = employees.findIndex(user => user.isLogin === true)
        const userIndex = employees.findIndex(user => user.username === username && user.password === password)
        if (findUserLogin < 0) {
          if (userIndex < 0) {
            callback(null, `username / password wrong`)
          } else {
            employees[userIndex].isLogin = true
            fs.writeFile('./data/employee.json', JSON.stringify(employees, null, 2), err => {
              if (err) {
                callback(err, `Cant save data employee`)
              } else {
                callback(null, `User ${username} logged in successfully`)
              }
            })
          }
        } else {
          callback(null, `${employees[findUserLogin].name} is still login. He / She need to logout first!`)
        }
      }
    })
  }

  static createOne([name, username, password, position], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
        let id
        employees.length ? id = employees[employees.length - 1].id + 1 : id = 1
        employees.push({ id, name, username, password, position, isLogin: false})
        fs.writeFile('./data/employee.json', JSON.stringify(employees, null, 2), err => {
          if (err) {
            callback(err, `Cant save data`)
          } else {
            callback(null, `Save data success { username: ${username}, role: ${position} }. Total employees: ${employees.length}`)
          }
        })
      }
    })
  }
}

module.exports = Employee