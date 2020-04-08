const Employee = require('./model.js')
const View = require('./view.js')

class Controller {
    constructor() {}

    static register(objData) {
        Employee.register(objData, (objData, fetchData) => {
            View.register(objData, fetchData)
        })
    }
}







module.exports = Controller