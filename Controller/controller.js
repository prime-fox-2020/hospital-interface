const Model = require('../Model/model')
const View = require('../View/view')

class Controller {
    
    static default(){
        View.message('Please type "index.js help" for more information')
    }
    static showHelp(){
        View.message('Please add your Command:')
        View.showHelp()
    }
    static showList(){
        Model.list((err, data) => {
            if (err) {
                View.message(err)
            } else {
                View.showList(data)
            }
        })
    }
    static register(params) {
        Model.register(params, (error, data) => {
            if (error) {
                View.err(error)
            } else {
                View.message(data)
            }
        })
    }

    static login(params) {
        Model.login(params, (error, success , data) => {
            if (error) {
                View.err(error)
            } else {
                View.login(success, data)
            }
        })
    }

    static logout() {
        Model.logout((error, success , data) => {
            if (error) {
                View.err(error)
            } else {
                View.login(success, data)
            }
        })
    }

    static addPatient(params) {
        Model.addPatient(params, (error ,data) => {
            if (error) {
                View.err(error)
            } else {
                View.message(data)
            }
        })
    }
}

module.exports = Controller