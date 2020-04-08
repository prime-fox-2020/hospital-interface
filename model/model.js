const fs = require('fs')
const Patient = require('./patient')

class Employee {
  constructor(id, name, position, username, password, isLogin) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.isLogin = isLogin
  }
}

class Admin extends Employee {
  constructor(id, name, position, username, password, isLogin) {
    super(id, name, position, username, password, isLogin)
  }
}

class Dokter extends Employee {
  constructor(id, name, position, username, password, isLogin) {
    super(id, name, position, username, password, isLogin)
  }
}

class Receptionist extends Employee {
  constructor(id, name, position, username, password, isLogin) {
    super(id, name, position, username, password, isLogin)
  }
}

class Employees {

  static list(callback) {
    fs.readFile('./employee.json','utf8', (err,data) => {
      if(err) {
        callback(err,null)
      } else {
        const list = JSON.parse(data)
        const listEmployees = []
        for(let i = 0; i < list.length; i++) {
          switch(list[i].position) {
            case 'dokter' : listEmployees.push(new Dokter(
              list[i].id,
              list[i].name,
              list[i].position,
              list[i].username,
              list[i].password,
              list[i].isLogin
            ))
            break;
            case 'admin' : listEmployees.push(new Admin(
              list[i].id,
              list[i].name,
              list[i].position,
              list[i].username,
              list[i].password,
              list[i].isLogin
            ))
            break;
            case 'receptionist' : listEmployees.push(new Receptionist(
              list[i].id,
              list[i].name,
              list[i].position,
              list[i].username,
              list[i].password,
              list[i].isLogin
            ))
            break;
          }
        }
        callback(null, listEmployees)
      }
    })
  }

  static save(data, callback) {
    let dataString = JSON.stringify(data, null, 4)
    fs.writeFile('./employee.json', dataString, (err) => {
      if(err) {
        callback(err,null)
      } else {
        callback(null, true)
      }
    })
  }

  static regist(param, callback) {
    this.list((err,data) => {
      let index = data.length
      if(err) {
        callback(err,null)
      } else {
        data.push({
          id: data[index-1].id+1,
          name: param[0],
          position: param[1],
          username: param[2],
          password: param[3],
          isLogin: false
        })
        this.save(data,(err) => {
          if(err) {
            callback(err,null)
          } else {
            callback(null, `Save data Success\n------------------\nName: ${param[0]}, Position: ${param[1]}, Username: ${param[2]}, Password: ${param[3]}. Total Employee : ${data.length} `)
          }
        })
      }
    })
  }
  
  static login(param, callback) {
    let msg;
    this.list((err,data) => {
      if(err) {
        callback(err, null) 
      } else {
        let pass = param[1]
        let user = param[0]

        let check = false
        let name;
        for(let a = 0; a < data.length; a++) {
          if(data[a].isLogin) {
            name = data[a].name
            check = true
          }
        }

        if(check) {
          callback(null, `User ${name} still logged in. You need to logout first.` )
        } else {
          for(let i = 0; i < data.length; i++) {
            if(data[i].username == user && data[i].password == pass) {
              data[i].isLogin = true
              msg = `User ${param[0]} logged in successfully!`
              break
            } else {
              msg = 'Username / password wrong'
            }
          }
          this.save(data,(err) => {
            if(err) {
              callback(err,null)
            } else {
              callback(null, msg)
            }
          })
        }
      }
    })
  }

  static addPatient (param, callback) {
    this.list((err, data) => {
      if(err) {
        callback(err, null)
      } else {
        let check = false
        for(let i = 0; i < data.length; i++) {
          if(data[i].isLogin && data[i].position !== 'dokter') {
            check = true
          }
        }

        if(check) {
          callback(null, `tidak memiliki akses untuk addPatient`)
        } else {
          for(let a = 0; a < data.length; a++) {
            if(data[a].isLogin && data[a].position == 'dokter') {
              fs.readFile('./patient.json', 'utf8', (err, data) => {
                let dataPatient = JSON.parse(data)
                let index = dataPatient.length+1
                let diagnosis = param.slice(1).join(', ')
                dataPatient.push(new Patient(
                  index,
                  param[0],
                  diagnosis
                ))

                let patient = JSON.stringify(dataPatient, null, 4)
                fs.writeFile('./patient.json', patient, (err) => {
                  if(err) {
                    callback(err, null)
                  } else {
                    callback(null, `Data pasien berhasil ditambahkan. Total data pasien : ${dataPatient.length}`)
                  }
                })
              })
            }
          }
        }
      }
    })
  }

  static logout(callback) {
    this.list((err, data) => {
      if(err) {
        callback(err,null) 
      } else {
        for(let i = 0; i < data.length; i++) {
          if(data[i].isLogin == true) {
            data[i].isLogin = false
          }
        }
        this.save(data, (err) => {
          if(err) {
            callback(err, null)
          } else {
            callback(null, 'User has been successfully logout!')
          }
        })
      }
    })
  }

}

module.exports = {
  Employees, Patient
}

