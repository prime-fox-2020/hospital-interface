const Controller = require('./controller.js')

const argv = process.argv
const command = argv[2]

class HospitalApp {
    
    choices(command){
       
        if (command == undefined){
            return Controller.appFace()
        }else if (command == 'register') {
            return Controller.register(argv[3], argv[4], argv[5])
        }else if (command == 'login') {
            return Controller.logIn(argv[3], argv[4])
        }else if (command == 'addPatient') {
            return Controller.addPatient(argv[3], argv.slice(4))
        }else if (command == 'logout') {
            return Controller.logOut()
        }

    }

}
var display = new HospitalApp()
display.choices(command)