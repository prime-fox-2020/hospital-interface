const ModelEmployee = require('../model/modelemployee')
const ModelPatient = require('../model/modelPatient')
const View = require('../view/view')

class Controller{
    static register(params){
        ModelEmployee.createOne(params, (err, message) => {
            if(err) View.printErr(err)
            else View.printSuccess(message)
        })
    }

    static login(params){
        ModelEmployee.login(params, (err, message) => {
            if(err) View.printErr(err)
            else View.printSuccess(message)
        })
    }

    static logout(){
        ModelEmployee.logout((err, message) => {
            if(err) View.printErr(err)
            else View.printSuccess(message)
        })
    }

    static addPatient(params){
        ModelEmployee.checkPosition((err, pos) => {
            if(err) View.printErr(err)
            else{
                ModelPatient.addPatient(params, pos, (error, msg) => {
                    if(err) View.printErr(error)
                    else View.printSuccess(msg)
                })
            }
        })
    }

    static showPatient(){
        ModelPatient.showPatient((err,data) => {
            if(err) View.printErr(err)
            else View.printSuccess(data)
        })
    }

    static deletePatient(param){
        ModelPatient.delete(param, (err,data) => {
            if(err) View.printErr(err)
            else View.printSuccess(data)
        })
    }

    static showMsg(msg){
        if(msg === 'help'){
            View.printSuccess('node index.js help\nnode index.js register <name> <position> <username> <password>\nnode index.js login <username> <password>\nnode index.js logout\nnode index.js addPatient <name> <diagnosis>\nnode index.js showPatient\nnode index.js deletePatient <id>\n')
        }
        else{
            View.printSuccess(msg)
        }
    }

}

module.exports = Controller