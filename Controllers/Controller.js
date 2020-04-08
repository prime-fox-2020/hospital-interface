const Employee = require('../Model/Employee')
const Patient = require('../Model/Patient')
const View = require('../Views/View')

class Controller {

  static showEmployee() {
    Employee.findAll((err, data) => {
      if (err)
        View.serverError(err)
      else
        View.showEmployee(data)
    })
  }

  static showPatient() {
    Patient.findAll((err, data) => {
      if (err)
        View.serverError(err)
      else
        View.showPatient(data)
    })
  }

  static register(params) {
    Employee.createOne(params, (err, msg) => {
      if (err)
        View.serverError(err)
      else
        View.registerInfo(msg)
    })
  }

  static login(params) {
    Employee.login(params, (err, msg) => {
      if (err)
        View.serverError(err)
      else
        View.loginInfo(msg)
    })
  }

  static addPatient(params) {
    Patient.createOne(params, (err, msg) => {
      if (err)
        View.serverError(err)
      else
        View.addPatientInfo(msg)
    })
  }
}

module.exports = Controller