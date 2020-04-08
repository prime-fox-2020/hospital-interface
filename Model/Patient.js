'use strict'

const fs = require('fs')
const patientFile = './Model/patient.json'

class Patient {
  constructor (id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static read (cb) {
    fs.readFile(patientFile, 'utf-8', (err, patients) => {
      if (err) {
        cb(err)
      } else {
        const arr = []
        patients = JSON.parse(patients)
        for (let i = 0; i < patients.length; i++) {
          arr.push(new Patient(patients[i].id, patients[i].name, patients[i].diagnosis))
        }
        cb(null, arr)
      }
    })
  }

  static save (data, cb) {
    fs.writeFile(patientFile, JSON.stringify(data, null, 2), (err) => {
      if (err) { cb(err) } else { cb(null, data) }
    })
  }

  static addPatient (patientName, diagnosis, cb) {
    this.read((err, patients) => {
      if (err) {
        cb(err)
      } else {
        let id = 1
        if (patients.length !== 0) {
          id = patients[patients.length - 1].id + 1
        }
        patients.push(new Patient(id, patientName, diagnosis))
        this.save(patients, cb)
      }
    })
  }
}

module.exports = Patient