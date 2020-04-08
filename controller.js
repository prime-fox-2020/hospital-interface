const ModelPatient = require('./models/modelPatient.js')
const ModelEmployee = require('./models/modelEmployee.js')

const View = require('./view.js', 'utf8')

class Controller {

    static appFace(){
        View.viewAppface()
    }

    static register(username, password, position){
        View.viewRegister()
        ModelEmployee.modelRegister(username, password, position, function(result){
            View.viewMessage(result)
        })
    }

    static logIn(username, password){
        View.viewLogin()
        ModelEmployee.modelLogin(username, password, function(result, error){
            if (result) {
                View.viewMessage(result)
            }else{
                View.viewMessage(error)
            }
        })
    }

    static addPatient(name, diagnosis){
        View.viewAddpatient()
        ModelPatient.modelAddpatient(name, diagnosis, function(result, error) {
            if (result) {
                View.viewMessage(result)
            }else{
                View.viewMessage(error)
            }
        })
    }

    static logOut(){
        ModelEmployee.modelLogout(function (result){
            View.viewMessage(result)
        })
        View.viewLogout()
    }

}

module.exports = Controller;