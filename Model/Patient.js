const fs = require('fs')

class Patient {
  constructor([name, diagnosis]) {
    this.name = name
    this.diagnosis = diagnosis
  }

  static findAll(callback) {
    fs.readFile('./data/patient.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        const patients = JSON.parse(data)
          .map(el => new Patient([el.name, el.diagnosis]))
        callback(null, patients)
      }
    })
  }
  static createOne([name, ...diagnosis], callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        const employees = JSON.parse(data)
        const findUserLogin = employees.findIndex(user => user.isLogin)
        if (findUserLogin >= 0 && employees[findUserLogin].position === 'dokter') {
          fs.readFile('./data/patient.json', 'utf8', (err, data) => {
            if (err) {
              callback(err, null)
            } else {
              const patients = JSON.parse(data)
              let id
              patients.length ? id = patients[patients.length - 1].id + 1 : id = 1
              patients.push({id, name, diagnosis: diagnosis.join(' ')})

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