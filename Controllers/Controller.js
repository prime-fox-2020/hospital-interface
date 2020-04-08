const Employee = require('../Model/Employee')
const Patient = require('../Model/Patient')
const View = require('../Views/View')

class Controller {

  static showEmployee() {
    Employee.findAll((err, datas) => {
      if (err)
        View.serverError(err)
      else
        View.showEmployee(datas)
    })
  }

  static showPatient() {
    Patient.findAll((err, datas) => {
      if (err)
        View.serverError(err)
      else
        View.showPatient(datas)
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

  static logout() {
    Employee.logout((err, msg) => {
      if (err)
        View.serverError(err)
      else
        View.logoutInfo(msg)
    })
  }

  static help() {
    View.help()
  }

  static errorCmd(cmd) {
    View.errorCmd(cmd)
  }
}

module.exports = Controller