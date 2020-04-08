const Employee = require('./employee')
const Patient = require('./patient')

const fs = require('fs')

class Model {

  static read(path, cb) {
    fs.readFile(path, null, (err, data) => {
      if (err) {
        cb(err, null)
      } else {
        data = JSON.parse(data)
        cb(null, data)
      }
    })
  }

  static write(path, newData, cb) {
    fs.writeFile(path, newData, (err) => {
      if (err) {
        cb(err, null)
      } else {
        cb(null, newData)
      }
    })
  }

  static register(param, cb) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let id
        if (data.length == 0) {
          id = 1
        } else {
          id = data[data.length - 1].id + 1
        }
        let newEmployee = new Employee(id, param[0], param[1], param[2], param[3], 'logout')
        data.push(newEmployee)
        // console.log('data: ', data);
        this.write('./data/employees.json', JSON.stringify(data, null, 4), (err) => {
          if (err) {
            cb(err, null)
          } else {
            cb(null, `save data success ${JSON.stringify(newEmployee)}. Total employee : ${data.length}`)
          }
        })
      }
    })
  }

  static login(params, cb) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        cb(err, null, null)
      } else {
        let success
        let checkLogin = false
        let msgUserLogin
        data.forEach(el => {
          if (el.loginStatus == "login") {
            checkLogin=true
            success = 'LOGOUT FIRST'
            msgUserLogin = `user ${el.username} still logged in. You need to logout first.`
          }
        });

        if (!checkLogin) {
          let checkUser = false
          let msg
          data.forEach(el => {
            if (el.username == params[0] && el.password == params[1]) {
              el.loginStatus = 'login'
              checkUser = true
              success = `SUCCES`
              msg = `user ${el.username} logged in successfully`
            }
          });
          if (!checkUser) {
            success = `ERROR`
            msg = `user ${params[0]} sorry 'user / password' is wrong`
          }
  
          this.write('./data/employees.json', JSON.stringify(data, null, 4), (err) => {
            if (err) {
              cb(err, null, null)
            } else {
              cb(null, success, msg)
            }
          })
        } else {
          cb(null, success, msgUserLogin)
        }
       
      }
    })
  }

  static logout(cb) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        cb(err, null, null)
      } else {
        let msg
        let success
        let logout = false
        data.forEach(el => {
          if (el.loginStatus == 'login') {
            el.loginStatus = 'logout'
            logout = true
            success = 'SUCCESS'
            msg = `user ${el.username} has been successfully logout!`
          }
        });
        if (!logout) {
          success = 'LOGIN FIRST'
          msg = 'Dont have any one login!'
        }
        this.write('./data/employees.json', JSON.stringify(data, null, 4), (err) => {
          if (err) {
            cb(err, null, null)
          } else {
            cb(null, success, msg)
          }
        })
      }
    })
  }

  static addPatient(params, cb) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let dokterLogin = false
        data.forEach(el => {
          if (el.position == 'dokter' && el.loginStatus == 'login') {
            dokterLogin = true
            this.read('./data/patients.json', (err, data) => {
              if (err) {
                cb(err, null)
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
                    cb(err, null)
                  } else {
                    cb(null, `data pasien ${params[0]} berhasil ditambahkan. Total data pasien : ${data.length}`)
                  }
                })
              }
            })
          }
        });
        if (!dokterLogin) {
          cb(`Maaf anda bukan Dokter, anda tidak memiliki akses untuk add patient`)
        }
      }
    })
  }
}

module.exports = Model