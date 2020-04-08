const Model = require('../models/model');
const View = require('../view/view');

class Controller {
    static help() {
        View.message('List Command \nhelp \nregister <name> <username> <password> <position> \nlogin <username> <password> \nlogout \naddPatient <name> <diagnosis> (NOTE: untuk dokter saja)')
    }

    static register(params) {
        Model.register(params, (error, msg) => {
            if (error) {
                View.err(error);
            } else {
                View.message(msg);
            }
        })
    }

    static login(params) {
        Model.login(params, (error, msg) => {
            if (error) {
                View.err(error);
            } else {
                View.message(msg);
            }
        })
    }

    static logout() {
        Model.logout((error, msg) => {
            if (error) {
                View.err(error);
            } else {
                View.message(msg);
            }
        })
    }

    static addPatient(params) {
        Model.addPatient(params, (error ,msg) => {
            if (error) {
                View.err(error);
            } else {
                View.message(msg);
            }
        })
    }
}

module.exports = Controller;