const Employees = require('../model/model').Employees
const View = require('../view/view')


class Controller {

    static help() {
        View.printHelp()
    }

    static list() {
        Employees.list((err, data) => {
            if(err) {
                View.print(err)
            } else {
                View.printData(data)
            }
        })
    }

    static regist(param) {
        Employees.regist(param,(err, data) => {
            if(err) {
                View.print(err)
            } else {
                View.print(data)
            }
        })
    }

    static login(param) {
        Employees.login(param, (err, data) => {
            if(err) {
                View.print(err)
            } else {
                View.print(data)
            }
        })
    }

    static addPatient(param) {
        Employees.addPatient(param, (err, data) => {
            if(err) {
                View.print(err)
            } else {
                View.print(data)
            }
        })
    }

    static logout() {
        Employees.logout((err, data) => {
            if(err) {
                View.print(err)
            } else {
                View.print(data)
            }
        })
    }

}


module.exports = Controller