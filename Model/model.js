const fs = require('fs')
const Employee = require('./employee')
const Patient = require('./patient')

class Model {

  static read(path, callback) {
    fs.readFile(path, null, (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        data = JSON.parse(data)
        callback(null, data)
      }
    })
  }

  static write(path, newData, callback) {
    fs.writeFile(path, newData, (err) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, newData)
      }
    })
  }

  static register(param, callback) {
    this.read('./data/employee.json', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        let id = 0
        if (data.length == 0) {
          id = 1
        } else {
          id = data[data.length - 1].id + 1
        }
        let newEmployee = new Employee(id, param[0], param[1], param[2], param[3], 'logout')
        data.push(newEmployee)
        this.write('./data/employee.json', JSON.stringify(data, null, 4), (err) => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, `save data success ${JSON.stringify(newEmployee)}. Total employee : ${data.length}`)
          }
        })
      }
    })
  }

  static login(params, callback) {
    this.read('./data/employee.json', (err, data) => {
      if (err) {
        callback(err, null, null)
      } else {
        let checkLogin = false
        let messageLogin = ''
        for (let i = 0; i < data.length; i++) {
          if (data[i].loginStatus == 'login') {
            checkLogin = true
            messageLogin = `user ${data[i].username} still logged in. You need to logout first.`
          }
        }

        if (!checkLogin) {
          let checkUser = false
          let message = ''
          for (let i = 0; i < data.length; i++) {
            if (data[i].username == params[0] && data[i].password == params[1]) {
              data[i].loginStatus = 'login'
              checkUser = true
              message = `user ${data[i].username} logged in successfully`
            }
          }
          if (!checkUser) {
            message = `username / password wrong`
          }
  
          this.write('./data/employee.json', JSON.stringify(data, null, 4), (err) => {
            if (err) {
              callback(err, null, null)
            } else {
              callback(null, message)
            }
          })
        } else {
          callback(null, messageLogin)
        }
       
      }
    })
  }

  static logout(callback) {
    this.read('./data/employee.json', (err, data) => {
      if (err) {
        callback(err, null, null)
      } else {
        let message = ''
        
        let logout = false
        for (let i = 0; i < data.length; i++) {
          data[i].loginStatus = 'logout'
          logout = true
          message = `user ${data[i].username} has been successfully logout!`
        }
        if (!logout) {
          message = 'Dont have any one login!'
        }
        this.write('./data/employee.json', JSON.stringify(data, null, 4), (err) => {
          if (err) {
            callback(err, null, null)
          } else {
            callback(null, message)
          }
        })
      }
    })
  }

  static addPatient(params, callback) {
    this.read('./data/employee.json', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        let dokterLogin = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].position == 'dokter' && data[i].loginStatus == 'login') {
            dokterLogin = true
            this.read('./data/patients.json', (err, data) => {
              if (err) {
                callback(err, null)
              } else {
                let id
                if (data.length == 0) {
                  id = 1
                } else {
                  id = Number(data[data.length - 1].id) + 1
                }
                let newPatient = new Patient(id, params[0], params.slice(1))
                data.push(newPatient)
                this.write('./data/patients.json', JSON.stringify(data, null, 4), (err) => {
                  if (err) {
                    callback(err, null)
                  } else {
                    callback(null, `data pasien ${params[0]} berhasil ditambahkan. Total data pasien : ${data.length}`)
                  }
                })
              }
            })
          }
        }
        if (!dokterLogin) {
          callback(`tidak memiliki akses untuk add patient`)
        }
      }
    })
  }
}

module.exports = Model