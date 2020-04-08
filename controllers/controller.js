const Hospital = require('../models/hospital.js')
const View = require('../views/view.js')

class Controller {

    static showEmployee(){
        Hospital.showEmployee((err, data) => {
            if(err) {
                View.show(err)
            } else {
                View.show(data)
            }
        })
    }

    static register(data) {
        Hospital.register(data, (err, data) => {
            if (err) {
                throw err
            } else {
                View.register(data[0], data[3])
            }
        })
    }

    static login(datas) {
        //console.log(datas)
        Hospital.login(datas, (err, data) => {
            if(err) {
                View.printError()
            } else {
                View.login(data)
            }
        })
    }

    static addPatient(datas) {
        Hospital.addPatient(datas, (err, data) => {
            if(err) {
                View.printError()
            } else {
                View.addPatient(data)
            }
        })
    }

    static logout() {
        // console.log("co")
        Hospital.logout((err, data) => {
            if(err) {
                View.printError()
            } else {
                View.logout()
            }
        })
    }
}

module.exports = Controller