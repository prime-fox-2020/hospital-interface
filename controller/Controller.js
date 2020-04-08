const Patient = require('../model/Patient')
const Employee = require('../model/Employee')
const View = require('../view/View')

class Controller {
    static register(params){
        let output = Employee.addOne(params)
        const message = `save data success ${JSON.stringify(output[0])}.\r\nTotal employee: ${output[1]}`
        View.showMessage(message)
    }

    static login(params){
        let message
        let loginIsSuccess = false
        let whoIsLoggedIn = null

        let dataEmployees = Employee.findAll()
        for(let i = 0; i < dataEmployees.length; i++){
            if(dataEmployees[i].isLogin){
                whoIsLoggedIn = dataEmployees[i].username
            }
            if(params[0] === dataEmployees[i].username && params[1] === dataEmployees[i].password){
                loginIsSuccess = true
                Employee.setLogin(dataEmployees[i].id)
                message = `user ${dataEmployees[i].username} logged in successfully`
            }
        }

        if(whoIsLoggedIn){
            message = `user ${whoIsLoggedIn} still logged in. You need to logout first`
        }else if(!loginIsSuccess){
            message = `username / password wrong`
        }
        View.showMessage(message)
    }

    static logout(){
        let message
        let logoutIsSuccess = false

        let dataEmployees = Employee.findAll()
        for(let i = 0; i < dataEmployees.length; i++){
            if(dataEmployees[i].isLogin){
                logoutIsSuccess = true
                Employee.setLogout(dataEmployees[i].id)
                message = `${dataEmployees[i].username} has been successfully logged out`
            }
        }

        if(!logoutIsSuccess){
            message = `Why logout? You are not logged in`
        }
        View.showMessage(message)
    }

    static addPatient(params){
        let isSuccess = Patient.addOne(params)
        let message
        if(isSuccess){
            let dataPatients = Patient.findAll()
            message = `a patient has been added. Total patient: ${dataPatients.length}`
        }else{
            message = `you have no access to add patient`
        }
        View.showMessage(message)
    }

    static helper(){
        const message = `These are the valid commands:\r\nnode index.js register <username> <password> <role>\r\nnode index.js login <username> <password>\r\nnode index.js logout\r\nnode index.js addPatient <name> <diagnosis_1> ... <diagnosis_n>`
        View.showMessage(message)
    }
}

module.exports = Controller