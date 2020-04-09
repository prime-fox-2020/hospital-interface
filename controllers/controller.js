const Model = require('../models/model')
const View = require('../views/view')

class Controller {

    static register(params) {
        Model.register(params, (error, msg) => {
            if (error) {
                View.err(error)
            } else {
                View.message(msg)
            }
        })
    }

    static login(params) {
        Model.login(params, (error, success , msg) => {
            if (error) {
                View.err(error)
            } else {
                View.login(success, msg)
            }
        })
    }

    static logout() {
        Model.logout((error, success , msg) => {
            if (error) {
                View.err(error)
            } else {
                View.login(success, msg)
            }
        })
    }

    static addPatient(params) {
        Model.addPatient(params, (error ,msg) => {
            if (error) {
                View.err(error)
            } else {
                View.message(msg)
            }
        })
    }
}

module.exports = Controller