const view = require('./view')
const model = require('./model')

class Controller {
    static help () {
        view.help()
    }
    static addEmployee (param) {
        model.addEmployee(param, (err, data) => {
            if (err) {
                view.display(err);
            }
            else {
                view.display(data);
            }
        });
    }

    static employeeLogin (param) {
        model.employeeLogin(param, (err, data) => {
            if (err) {
                view.display(err);
            }
            else {
                view.display(data);
            }
        })
    }

    static addPatient (param) {
        model.addPatient(param, (err, data) => {
            if (err) {
                view.display(err);
            }
            else {
                view.display(data);
            }
        });
    }

    static readLoginData (param) {
        model.readLoginData(param, (err, data) => {
            if (err) {
                view.display(err);
            }
            else {
                view.display(data);
            }
        })
    }
}



module.exports = Controller