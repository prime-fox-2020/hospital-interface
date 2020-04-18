const Hospital = require('../models/hospital.js')
const View = require('../views/view.js')

class Controller {

    static showEmployee(){
        Hospital.showEmployee((err, data) => {
            if(err) {
                View.printError()
            } else {
                View.show(data)
            }
        })
    }

    static register(data) {
        Hospital.register(data, (err, data) => {
            if (err) {
                View.printError()
            } else {
                View.register(data[0], data[3])
            }
        })
    }

    static login(datas) {
        Hospital.login(datas, (err, data) => {
            if(err) {
                View.printError()
            } else {
                //View.login(datas)
                if(typeof data === 'string') {
                    View.login(data)
                } else {
                    View.login(datas)
                }
            }
        })
    }
 

   static add(datas) {
       Hospital.add(datas, (err, data) => {
           if(err) {
               View.printError()
           } else {
               View.add(datas)
           }
       })
   }

   static logout() {
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