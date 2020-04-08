const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this._id = id
    this._name = name
    this._diagnosis = diagnosis
  }

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
  get diagnosis() {
    return this._diagnosis
  }
  set diagnosis(diagnosis) {
    this._diagnosis = diagnosis
  }

  static createOne([id, name, ...diagnosis], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, `Server unreachable`)
      } else {
        const employees = JSON.parse(data)
        const findUserLogin = employees.findIndex(user => user._isLogin)
        if (findUserLogin >= 0 && employees[findUserLogin]._position._isDoctor) {
          fs.readFile('./data/patient.json', 'utf8', (err, data) => {
            if (err) {
              callback(err, `Server unreachable`)
            } else {
              const patients = JSON.parse(data)
              patients.push(new Patient(id, name, diagnosis.join(' ')))

              fs.writeFile('./data/patient.json', JSON.stringify(patients, null, 2), err => {
                if (err) {
                  callback(err, `Cant save data patient`)
                } else {
                  callback(null, `data pasien berhasil ditambahkan. Total data pasien: ${patients.length}`)
                }
              })
              console.log(patients)
              // console.log(id, name, diagnosis.join(' '))
            }
          })
        } else {
          callback(null, `tidak memiliki akses untuk add Patient`)
        }
      }
    })
  }
}

module.exports = Patient