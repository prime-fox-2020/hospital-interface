const Patient = require('../model/Patient')
const Employee = require('../model/Employee')
const View = require('../view/View')

class Controller {

    static register(params){
        if(params[params.length - 1] === 'patient'){
            Patient.addOne(params)
        }else{
            let output = Employee.addOne(params)
            const message = `save data success ${JSON.stringify(output[0])}.\r\nTotal employee: ${output[1]}`
            View.showMessage(message)
        }
    }
}

module.exports = Controller