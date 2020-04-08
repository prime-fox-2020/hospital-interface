const fs = require('fs')
const Employee = require('./model-employee.js')
const Doctor  = require('./model-doctor.js')
const Receptionist  = require('./model-receptionist.js')
const OfficeBoy  = require('./model-office-boy.js')
const Admin  = require('./model-admin.js')

const Patient  = require('./model-patient')

class Model {
  static kosong(callback) {
    let data = '$ node index.js help'
    callback(data)
  }

  static help(callback1) {
    fs.readFile('./data/help.txt', 'utf8', function(error, data) {
      if (error) {
        callback1(error, null)
      } else {
        callback1(null, data)
      }
    })  
  }

  static listEmployee(callback) {
    fs.readFile('./data/employee.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        const dataParse = JSON.parse(data)
        const dataConvert = []
        for (let i in dataParse) {
          if (dataParse[i].position == "dokter") {
            dataConvert.push(new Doctor(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, dataParse[i].is_login))
          } else if (dataParse[i].position == "receptionist") {
            dataConvert.push(new Receptionist(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, dataParse[i].is_login))
          } else if (dataParse[i].position == "admin") {
            dataConvert.push(new Admin(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, dataParse[i].is_login))
          } else if (dataParse[i].position == "office boy") {
            dataConvert.push(new OfficeBoy(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, dataParse[i].is_login))
          } else {
            dataConvert.push(new Employee(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, dataParse[i].is_login))
          }
        }
        callback(null, dataConvert)
      }
    })  
  }

  static listPatient(callback) {
    fs.readFile('./data/patient.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        const dataParse = JSON.parse(data)
        const dataConvert = []
        for (let i in dataParse) {
          dataConvert.push(new Patient(dataParse[i].id, dataParse[i].name, dataParse[i].diagnosis))
        }
        callback(null, dataConvert)
      }
    })  
  }

  static registerEmployee(arrInfos, callback) {
    fs.readFile('./data/employee.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        const dataParse = JSON.parse(data)
        let newId = null
        if (dataParse.length == 0) {
            newId = 1
        } else {
          newId = dataParse[dataParse.length - 1].id + 1
        }

        if (arrInfos[1] == "dokter") {
          dataParse.push(new Doctor(newId, arrInfos[0], arrInfos[1], arrInfos[2], arrInfos[3]))
        } else if (arrInfos[1] == "admin") {
          dataParse.push(new Admin(newId, arrInfos[0], arrInfos[1], arrInfos[2], arrInfos[3]))
        } else if (arrInfos[1] == "office boy") {
          dataParse.push(new OfficeBoy(newId, arrInfos[0], arrInfos[1], arrInfos[2], arrInfos[3]))
        } else if (arrInfos[1] == "receptionist") {
          dataParse.push(new Receptionist(newId, arrInfos[0], arrInfos[1], arrInfos[2], arrInfos[3]))
        } else {
          dataParse.push(new Employee(newId, arrInfos[0], arrInfos[1], arrInfos[2], arrInfos[3]))
        }
        fs.writeFile('./data/employee.json', JSON.stringify(dataParse, null, 3), function(error) {
          if (error) {
            callback(error, null)
          } else {
            callback(null, `Employee dengan nama ${arrInfos[0]} telah sukses ditambahkan. Total employee : ${dataParse.length}`)
          }
        })    
      }
    })  
  }

  static login(params, callback) {
    fs.readFile('./data/employee.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        let pesan = null
        const dataParse = JSON.parse(data)
        let islogged = false
        for(let i in dataParse) {
          if (dataParse[i].is_login === true) {
            islogged = true
            pesan = 'Maaf anda tidak bisa login karena sudah ada yang login sebelumnya'
          }
        }

        if (islogged == false) {
          let checkUser = false
          let pesanSuksesLogin = null
          for(let i in dataParse) {
            if (dataParse[i].username === params[0] && dataParse[i].password == params[1]) {
              checkUser = true
              dataParse[i].is_login = true
              pesanSuksesLogin = `Username ${params[0]} berhasil login`
            }
          }
          
          if (checkUser == false) {
            pesanSuksesLogin = 'Maaf username atau password salah'
          }
          fs.writeFile('./data/employee.json', JSON.stringify(dataParse, null, 3), function(error) {
            if (error) {
              callback(error, null)
            } else {
              callback(null, pesanSuksesLogin)
            }
          })    
        } else {
          callback(null, pesan)
        }
      }
    })
  }

  static addPatient(params, callback) {
    fs.readFile('./data/employee.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        let pesan = null
        const dataParse = JSON.parse(data)
        let isDoctor = false
        for(let i in dataParse) {
          if (dataParse[i].position === "dokter" && dataParse[i].is_login === true) {
            isDoctor = true
            fs.readFile('./data/patient.json', 'utf8', function(error, data) {
              if (error) {
                callback(error, null)
              } else {
                const dataParse = JSON.parse(data)
                let newId = null
                if (dataParse.length == 0) {
                    newId = 1
                } else {
                  newId = dataParse[dataParse.length - 1].id + 1
                }
                let patientName = params[0]
                let diagnosis = params.slice(1)
                dataParse.push(new Patient(newId, patientName, diagnosis))
                fs.writeFile('./data/patient.json', JSON.stringify(dataParse, null, 3), function(error) {
                  if (error) {
                    callback(error, null)
                  } else {
                    callback(null, `Patien dengan nama ${patientName} telah sukses ditambahkan. Total Patient : ${dataParse.length}`)
                  }
                })    
              }
            })  
          }   
        }
        if (isDoctor == false) {
          pesan = 'maaf add patient hanya bisa dilakukan oleh dokter yang sedang login'
          callback(null, pesan)
        }
      }
    })
  }

  static logout(callback) {
    fs.readFile('./data/employee.json', 'utf8', function(error, data) {
      if (error) {
        callback(error, null)
      } else {
        const dataParse = JSON.parse(data)
        let pesan = null
        let isLogout = false
        for (let i in dataParse) {
          if (dataParse[i].is_login === true) {
            isLogout = true
            dataParse[i].is_login = false
            fs.writeFile('./data/employee.json', JSON.stringify(dataParse, null, 3), function(error) {
              if (error) {
                callback(error, null)
              } else {
                callback(null, `Employee dengan nama ${dataParse[i].name} telah logout`)
              }
            })    
          }
        }
        if (isLogout == false) {
          pesan = 'semua employee telah logout'
          callback(null, pesan)
        }
      }
    })  
  }
}

module.exports = Model