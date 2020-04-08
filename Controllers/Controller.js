const Employee = require('../Model/Employee')
const Patient = require('../Model/Patient')
const View = require('../Views/View')

class Controller {

  static register(params) {
    Employee.createOne(params, (err, msg) => {
      if (err)
        View.serverError(msg)
      else
        View.registerInfo(msg)
    })
  }

  static login(params) {
    Employee.login(params, (err, msg) => {
      if (err)
        View.serverError(msg)
      else
        View.loginInfo(msg)
    })
  }

  static addPatient(params) {
    Patient.createOne(params, (err, msg) => {
      if (err)
        View.serverError(msg)
      else
        View.addPatientInfo(msg)
    })
  }
}

module.exports = Controller