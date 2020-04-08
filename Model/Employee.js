'use strict'

const fs = require('fs')
const employeeFile = './Model/employee.json'

class Employee {
  constructor (username, password, role, isLogin) {
    this.username = username
    this.password = password
    this.role = role
    this.isLogin = isLogin
  }

  static read (cb) {
    fs.readFile(employeeFile, 'utf-8', (err, data) => {
      if (err) {
        cb(err)
      } else {
        data = JSON.parse(data)
        const arr = []
        for (let i = 0; i < data.length; i++) {
          arr.push(new Employee(data[i].username, data[i].password, data[i].role, data[i].isLogin))
        }
        cb(null, arr)
      }
    })
  }

  static save (data, cb) {
    fs.writeFile(employeeFile, JSON.stringify(data, null, 2), 'utf-8', err => {
      if (err) {
        cb(err)
      } else {
        cb()
      }
    })
  }

  static registerEmployee (username, password, role, cb) {
    const newEmployee = new Employee(username, password, role, false)

    this.read((err, data) => {
      if (err) {
        return cb(err)
      } else { 
        for (let i = 0; i < data.length; i++) {
          if (data[i].username === username) {
            const error = `Username '${username}' has been taken, please register with different username`
            return cb(error)
          }
        }
        data.push(newEmployee)
        this.save(data, (err) => {
          if (err) {
            cb(err)
          } else {
            cb(null, `Save data success ${JSON.stringify(newEmployee, null, 2)}. Total employee : ${data.length}`)
          }
        })
      }
    })
  }

  static findOne (findObj, cb) {
    this.read((err, employees) => {
      if (err) {
        return cb(err)
      } else {
        for (let i = 0; i < employees.length; i++) {
          if (employees[i][findObj.where] === findObj.value) {
            return cb(null, employees[i])
          }
        }
        cb()
      }
    })
  }

  static update (updateObj, cb) {
    this.read((err, employees) => {
      if (err) {
        return cb(err)
      } else { 
        for (let i = 0; i < employees.length; i++) {
          if (employees[i][updateObj.where] === updateObj.value) {
            employees[i][updateObj.updateField] = updateObj.updateValue
            cb(null, employees[i])
          }
        }
        this.save(employees, cb)
      }
    })
  }

  static checkLogValidity (cb) {
    this.read((err, employees) => {
      if (err) { return cb(err) }

      let found = false
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].isLogin) {
          found = true
          cb(null, employees[i])
          break
        }
      }
      if (!found) {
        const message = `No user is currently logged in. Please log in first!`
        cb(message)
      }
    })
  }

  static logOut (cb) {
    this.getAll((err, employees) => {
      if (err) {
        cb(err)
      } else {
        for (let i = 0; i < employees.length; i++) {
          if (employees[i].isLogin) {
            employees[i].isLogin = false
            this.save((err) => {
              if (err) cb(err)
            }, employees)
            return cb(null, employees[i])
          }
        }
      }
    })
  }
}

module.exports = Employee
