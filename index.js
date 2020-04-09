let controller = require('./controller/controller')
let command = process.argv[2]
let input = process.argv.slice(3)

switch(command){
    case "register":
    controller.register(input[0],input[1],input[2],input[3])
    //name position username password
    break;
    case "list":
    controller.list()
    break;
    case "login":
    controller.login(input[0],input[1])
    break;
    case "logout":
    controller.logout()
    break;
    case "registerPatient":
    controller.registerPatient(input[0],input[1])
    //nama diagnosis
    break;
}