const Controller = require('./controllers/controller.js')
const command = process.argv[2]
const datas = process.argv.slice(3)

switch(command) {
    case 'showEmployee':
        Controller.showEmployee()
        break
    case 'register' :
        Controller.register(datas)
        break
    case 'login' :
        Controller.login(datas)
        break
    case 'addPatient' :
        Controller.addPatient(datas)
        break
    case 'logout' :
        Controller.logout()
        
}