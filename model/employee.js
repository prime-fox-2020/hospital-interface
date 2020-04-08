const fs = require("fs")
const dbPath = "./employee.json"
class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.loginStatus = false
  }
  static readData(cb) {
    fs.readFile(dbPath, "utf8", function (err, data) {
      if (err) {
        cb(err, null)
      } else {
        data = JSON.parse(data)
        //console.log(data)
        cb(null, data)
      }
    })
  }
  static saveData(input, cb) {
    input = JSON.stringify(input, null, 2)
    fs.writeFile(dbPath, input, "utf8", function (err) {
      if (err) {
        cb(err)
      } else {
        cb(null)
      }
    })
  }

  static register(data, cb) {
    let dataBaru = new Employee(data[0], data[1], data[0], data[2])
    //console.log(dataBaru)
    Employee.readData(function (err, dataEmployee) {
      if (err) {
        cb(err, null)
      } else {
        dataEmployee.push(dataBaru)
        //console.log(dataEmployee)
        Employee.saveData(dataEmployee, function (err) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, dataEmployee)
          }
        })
      }
    })

  }

  static logout(cb) {
    Employee.readData(function (err, dataEmployee) {
      if (err) {
        cb(err)
      } else {
        for (let i = 0; i < dataEmployee.length; i++) {
          dataEmployee[i].loginStatus = false
        }
        Employee.saveData(dataEmployee, function (err) {
          if (err) {
            cb(err)
          } else {
            cb(null, "Anda Berhasil Logout")
          }
        })
      }
    })
  }


  static login(dataLogin, cb) {
    let checkUsername = dataLogin[0]
    let checkPassword = dataLogin[1]
    Employee.readData(function (err, dataEmployee) {
      //console.log(dataEmployee)
      if (err) {
        cb(err, null)
      } else {
        let flagCheckPw = false
        let flagDualLogin = false
        for (let i = 0; i < dataEmployee.length; i++) {
          if (dataEmployee[i].loginStatus === true) {
            flagDualLogin = true
            flagCheckPw = true
            // cb(null, checkUsername, flagCheckPw, flagDualLogin)
            break;
          } else if (dataEmployee[i].username == checkUsername &&
            dataEmployee[i].password == checkPassword) {
            flagCheckPw = true
            dataEmployee[i].loginStatus = true
            Employee.saveData(dataEmployee, function (err) {
              if (err) {
                cb(err, null)
              }
            })

          }
        }
        cb(null, checkUsername, flagCheckPw, flagDualLogin)
      }
    })
  }
}
module.exports = Employee