const Employee = require('./model.js')
const View = require('./view.js')

class Controller {
    constructor() {}

    static register(objData) {
        Employee.register(objData, (objData, fetchData) => {
            View.register(objData, fetchData)
        })
    }

    static login(objLogin) {
        Employee.login(objLogin, (status, objLogin) => {
            View.login(status, objLogin)
        })
    }
}


module.exports = Controller