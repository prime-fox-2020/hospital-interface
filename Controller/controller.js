const Model = require('../Model/model')
const View = require('../View/view.js')

class Controller {
    static kosong() {
        Model.kosong(function(error, data) {
            if (error) {
                View.kosong(error)
            } else {
                View.kosong(data)
            }
        }) 
    }

    static help() {
        Model.help(function(error, data) {
            if (error) {
                View.help(error)
            } else {
                View.help(data)
            }
        })
    }

    static listEmployee() {
        Model.listEmployee(function(error, data) {
            if (error) {
                View.listEmployee(error)
            } else {
                View.listEmployee(data)
            }
        })
    }

    static listPatient() {
        Model.listPatient(function(error, data) {
            if (error) {
                View.listPatient(error)
            } else {
                View.listPatient(data)
            }
        })
    }

    static registerEmployee(params) {
        Model.registerEmployee(params, function(error, data) {
            if (error) {
                View.registerEmployee(error)
            } else {
                View.registerEmployee(data)
            }
        })
    }

    static login(params) {
        Model.login(params, function(error, data) {
            if (error) {
                View.login(error)
            } else {
                View.login(data)
            }
        })
    }

    static addPatient(params) {
        Model.addPatient(params, function(error, data) {
            if(error) {
                View.addPatient(error)
            } else {
                View.addPatient(data)
            }
        })
    }

    static logout() {
        Model.logout(function(error, data) {
            if (error) {
                View.logout(error)
            } else {
                View.logout(data)
            }
        })
    }


}

module.exports = Controller