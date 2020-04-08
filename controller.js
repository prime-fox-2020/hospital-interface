const { Employee, Patient } = require('./model.js');
const View = require('./view.js')

class Controller {
    constructor() { }

    static register(objData) {
        Employee.register(objData, (objData, fetchData) => {
            View.register(objData, fetchData);
        })
    }

    static login(objLogin) {
        Employee.login(objLogin, (status, objLogin) => {
            View.login(status, objLogin);
        })
    }

    static addPatient(objPatient) {
        Patient.add(objPatient, (status, fetchPatient) => {
            View.patient(status, fetchPatient);
        })
    }

}// end class controller

module.exports = Controller