'use strict'

// Import
const Employee = require('../Model/Employee')
const Patient = require('../Model/Patient')
const HospitalView = require('../View/view')

class HospitalController {
  static showError () {
    HospitalView.showError()
  }

  static showHelp () {
    HospitalView.showHelp()
  }

  static registerEmployee (username, password, role) {
    Employee.registerEmployee(username, password, role, (err, message) => {
      if (err) {
        HospitalView.showError(err)
      } else {
        HospitalView.showMessage(message)
      }
    })
  }

  static login (username, password) {
    Employee.findOne({ where: 'isLogin', value: true }, (err, employee) => {
      if (err) return HospitalView.showError(err)
      if (employee) {
        return HospitalView.showError(`User '${employee.username}' is still logged in. Please logout first!`)
      } else {
        Employee.findOne({ where: 'username', value: username }, (err, employee) => {
          if (err) return HospitalView.showError(err)
          if (employee) {
            if (employee.password === password) {
              Employee.update({ where: 'username', value: username, updateField: 'isLogin', updateValue: true }, (err, employee) => {
                if (err) return HospitalView.showError(err)
                if (employee) {
                  HospitalView.showMessage(`User '${employee.username}' logged in successfully`)
                }
              })
            } else {
              HospitalView.showError('username / password wrong')
            }
          } else {
            HospitalView.showError('username / password wrong')
          }
        })
      }
    })
  }

  static logout () {
    Employee.findOne({ where: 'isLogin', value: true }, (err, employee) => {
      if (err) return HospitalView.showError(err)
      if (employee) {
        Employee.update({ where: 'isLogin', value: true, updateField: 'isLogin', updateValue: false }, (err, employee) => {
          if (err) return HospitalView.showError(err)
          if (employee) {
            return HospitalView.showMessage(`User '${employee.username}' has been successfully logged out!`)
          }
        })
      } else {
        HospitalView.showError('There is no one currently logged in. Please log in first!')
      }
    })
  }

  static addPatient (patientName, disease) {
    Employee.checkLogValidity((err, employee) => {
      if (err) {
        HospitalView.showError(err)
      } else {
        if (employee.role === 'doctor') {
          Patient.addPatient(patientName, disease, (err, patients) => {
            if (err) { HospitalView.showError(err) } else {
              HospitalView.showMessage(`Patient data is added succesfully. Total patient data : ${patients.length}`)
            }
          })
        } else { HospitalView.showError('This user has no access to add patient') }
      }
    })
  }
}

module.exports = HospitalController