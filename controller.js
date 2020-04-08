const Model = require("./model/model")
const View = require("./view")

class Controller {
    static register(name, userName, password, position) {
        Model.register(name, userName, password, position, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.register(data)
            }
        })
    }
    static login(userName, password) {
        Model.login(userName, password, (err, data) => {
            if (err) {
                View.showError(err)
            } else if(userName !== data && data !== false){
                View.loginFailed(data)
            } else {
                View.login(data)
            }
        })
    }
    static addPatient(id,name,penyakit){
        Model.addPatient(id, name,penyakit, (err, data) => {
            if (err) {
                View.showError(err)
            } else {
                View.addPatient(data)
            }
        })
    }
    static logout(){
        Model.logout((err,data) => {
            if (err) {
                View.showError(err)
            } else {
                View.logout(data)
            }
        })
    }
}

module.exports = Controller