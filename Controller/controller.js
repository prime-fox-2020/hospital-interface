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
        Model.register(params, (err, data) => {
            if (err) {
                View.message(err)
            } else {
                View.message(data)
            }
        })
    }
    
    static login(params) {
        Model.login(params, (err, data) => {
            if (err) {
                View.message(err)
            } else {
                View.message(data)
            }
        })
    }
    
    static logout() {
        Model.logout((err, data) => {
            if (err) {
                View.message(err)
            } else {
                View.message(data)
            }
        })
    }
    
    static addPatient(params) {
        Model.addPatient(params, (err ,data) => {
            if (err) {
                View.message(err)
            } else {
                View.message(data)
            }
        })
    }
    static showPatient(){
        Model.listPatient((err, data) => {
            if (err) {
                View.message(err)
            } else {
                View.showList(data)
            }
        })
    }
}

module.exports = Controller