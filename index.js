'use strict'

// IO
const command = process.argv[2]
const parameters = process.argv.slice(3)
const HospitalController = require('./Controller/controller')

// Router
switch (command) {
  case 'help':
    HospitalController.showHelp()
    break
  case 'register':
    if (parameters.length <= 2) {
      HospitalController.showHelp()
    } else {
      HospitalController.registerEmployee(parameters[0], parameters[1], parameters[2])
    }
    break
  case 'login':
    if (parameters.length <= 1) {
      HospitalController.showHelp()
    } else {
      HospitalController.login(parameters[0], parameters[1])
    }
    break
  case 'logout':
    HospitalController.logout(parameters[0])
    break
  case 'addPatient':
    if (parameters.length < 2) {
      HospitalController.showHelp()
    } else {
      const patientName = parameters[0]
      const disease = parameters.slice(1)

      if (disease.length === 0) {
        HospitalController.showHelp()
      }
      HospitalController.addPatient(patientName, disease)
    }
    break
  default:
    HospitalController.showHelp()
    break
}