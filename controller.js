const EmployeeModel = require('./model/employeeModel')
const PatientModel = require('./model/patientModel')
const View = require('./view')

class Controller {
    static viewHelp(){
        View.viewHelp()
    }
    static viewAllEmployee(){
        EmployeeModel.viewAllEmployee((err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
    static registerEmployee(param){
        EmployeeModel.registerEmployee(param, (err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
    static loginEmployee(param){
        EmployeeModel.loginEmployee(param, (err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
    static logoutEmployee(){
        EmployeeModel.logoutEmployee((err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
    static registerPatient(param){
        PatientModel.registerPatient(param, (err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
    static viewAllPatient(){
        PatientModel.viewAllPatient((err,data) =>{
            if (err){
                View.printError(err)
            } else {
                View.printSuccess(data)
            }
        })
    }
}

module.exports = Controller