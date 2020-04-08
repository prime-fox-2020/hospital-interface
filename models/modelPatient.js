const fs = require('fs')
const Employee = require('./modelEmployee.js')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  
  static readFilePatient(callback) { // sudah jadi arr of objs
    fs.readFile('./patient.json', (err,data) => {
      if (err) throw err ;
      callback(JSON.parse(data))
    })
  }
  
  static writeFilePatient(data, callback) {
    fs.writeFile('./patient.json', JSON.stringify(data), (err) => {
      if (err) throw err;
    })
  }

  static modelAddpatient(name, diagnosis, callback1){
    this.readFilePatient((dataPatient) => {
      Employee.readFileEmployee((dataEmployee) => {
        for (let i in dataEmployee) {
          if (dataEmployee[i].position === 'dokter') {
            dataEmployee[i].status = true
            let id = dataPatient.length
            if (dataPatient.length === 0) {
              id = 1
            } else {
              id = dataPatient.length + 1
            }
            let patient = new Patient(id, name, diagnosis)
            dataPatient.push(patient)// add new
            this.writeFilePatient(dataPatient, ()=>{})//
            var result = `Total data pasien ada ${dataPatient.length}\n`
            callback1(result, null)
          } else if (dataEmployee[i].position !== 'dokter' || dataEmployee[i].status == false) {
            var error = `Maaf anda tidak memiliki akses untuk add patient`
            callback1(null, error)//back to control
          }
        }
      })
    })
  }
}

module.exports = Patient
