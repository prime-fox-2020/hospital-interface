const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }


}

class Employee {
  constructor(name, position, username, password, isLogin) {
    this.name = name
    this.role = position
    this.username = username
    this.password = password
    this.isLogin = isLogin || false
  }

}
class Admin extends Employee {
  constructor(name, role, username, password, isLogin) {
    super(name, role, username, password, isLogin)
  }
}
class OfficeBoy extends Employee {
  constructor(name, role, username, password, isLogin) {
    super(name, role, username, password, isLogin)
  }
}
class Doctor extends Employee {
  constructor(name, role, username, password, isLogin) {
    super(name, role, username, password, isLogin)
  }
}
class Receptionist extends Employee {
  constructor(name, role, username, password, isLogin) {
    super(name, role, username, password, isLogin)
  }
}

class EmployeeFactory {

  static list(cb) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) {
        cb(err, null)
      } else {
        const newData = JSON.parse(data)
        const newPeople = []
        for (let i = 0; i < newData.length; i++) {
          switch (newData[i].role) {
            case 'admin':
              newPeople.push(new Admin(
                newData[i].name,
                newData[i].role,
                newData[i].username,
                newData[i].password,
                newData[i].isLogin
              ))
              break;
            case 'office boy':
              newPeople.push(new OfficeBoy(
                newData[i].name,
                newData[i].role,
                newData[i].username,
                newData[i].password,
                newData[i].isLogin
              ))
              break;
            case 'dokter':
              newPeople.push(new Doctor(
                newData[i].name,
                newData[i].role,
                newData[i].username,
                newData[i].password,
                newData[i].isLogin
              ))
              break;
            case 'receptionist':
              newPeople.push(new Receptionist(
                newData[i].name,
                newData[i].role,
                newData[i].username,
                newData[i].password,
                newData[i].isLogin
              ))
              break;
          }
        }
        cb(null, newPeople)
      }
    })
  }
  static save(data, cb) {
    fs.writeFile('./employee.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        cb(err, null)
      } else {
        cb(null, true)
      }
    })
  }
  static savePatient(data, cb) {
    fs.writeFile('./patient.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        cb(err, null)
      } else {
        cb(null, true)
      }
    })
  }
  static register(params, cb) {
    this.list((err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let newPeople
        switch (params[1]) {
          case 'admin':
            newPeople = new Admin(
              params[0],
              params[1],
              params[2],
              params[3]
            )
            break;
          case 'office boy':
            newPeople = new OfficeBoy(
              params[0],
              params[1],
              params[2],
              params[3]
            )
            break;
          case 'dokter':
            newPeople = new Doctor(
              params[0],
              params[1],
              params[2],
              params[3]
            )
            break;
          case 'receptionist':
            newPeople = new Receptionist(
              params[0],
              params[1],
              params[2],
              params[3]
            )
            break;
        }
        // const newPeople = new Employee(params[0],params[1],params[2],params[3])
        data.push(newPeople)
        this.save(data, (err, data1) => {
          if (err) {
            cb(err, null)
          } else {
            cb(null, [newPeople, data.length])
          }
        })
      }
    })
  }
  static login(params, cb) {
    this.list((err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let newPeople = data
        let name = params[0]
        let pwd = params[1]
        let flag = 0
        for (let i = 0; i < newPeople.length; i++) {
          if (name === newPeople[i].name && pwd === newPeople[i].password) {
            newPeople[i].isLogin = true
            flag = 1
          }
        }
        if (flag == 1) {
          this.save(newPeople, (err, data1) => {
            if (err) {
              cb(err, null)
            } else {
              cb(null, [flag, name])
            }
          })
        } else {
          cb(null, [flag, name])
        }

      }
    })
  }
  static logout(params, cb) {
    this.list((err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let newPeople = data
        for (let i = 0; i < newPeople.length; i++) {
          if (newPeople[i].isLogin = true) {
            newPeople[i].isLogin = false
          }
        }
        this.save(newPeople, (err, data1) => {
          if (err) {
            cb(err, null)
          } else {
            cb(null, newPeople)
          }
        })

      }
    })
  }
  static listPatience(cb) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      if (err) {
        cb(err, null)
      } else {
        const newData = JSON.parse(data)
        let newPeople = []
        newData.forEach(data => {
          newPeople.push(new Patient(data.id, data.name, data.diagnosis))
        })
        cb(null, newPeople)
      }
    })
  }
  static add(params, cb) {
    this.listPatience((err, data) => {
      if (err) {
        cb(err, null)
      } else {
        let newPeople = data
        let getId
          getId = newPeople[newPeople.length - 1].id  + 1
        newPeople.push(new Patient(getId, params[0], params.slice(1)))
        this.savePatient(newPeople, (err, data) => {
          if (err) {
            cb(err, null)
          } else {
            cb(null, newPeople)
          }
        })
      }
    })
  }
}

module.exports = {
  Patient, EmployeeFactory
}