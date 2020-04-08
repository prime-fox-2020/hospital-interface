const argv = process.argv.slice(2)
const input = argv[0]
const params = argv.slice(1)
const Controller = require("./controller.js")

// console.log(argv,params)

switch(input){
    case 'register':
            Controller.register(params)
            break;
    case 'login':
            Controller.login(params)
            break;
    case 'addPatient':
            Controller.addPatient(params)
            break;
    case 'logout':
            Controller.logout()
            break;
}
