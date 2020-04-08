const Receptionist = require('./Receptionist')
const OfficeBoy = require('./OfficeBoy')
const Dokter = require('./Dokter')
const Admin = require('./Admin')
const fs = require('fs')

class Employee {
  constructor([name, position]) {
    this.name = name
    this.position = this.positionSelector(position)
  }

  positionSelector(position) {
    switch (position) {
      case 'admin': return new Admin(); break
      case 'dokter': return new Dokter(); break
      case 'office-boy': return new OfficeBoy(); break
      case 'receptionist': return new Receptionist(); break
    } 
  }

  static findAll(callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        const employees = JSON.parse(data)
          .map(el => new Employee([el.name, el.position]))
        callback(null, employees)
      }
    })
  }

  static login([username, password], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
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

  static logout(callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        const employees = JSON.parse(data)
        employees.forEach(employee => employee.isLogin = false)
        fs.writeFile('./data/employee.json', JSON.stringify(employees, null, 2), err => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, 'user has been successfully logout!')
          }
        })
      }
    })
  }

  static createOne([name, username, password, position], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
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