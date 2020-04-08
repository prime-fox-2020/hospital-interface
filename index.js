const Controller = require("./controller/controller")
const View = require("./view/view")
const Employee = require("./model/employee")
const Patient = require("./model/patient")
const input = process.argv
const command = input[2]
const data = input.slice(3)


switch (command) {
    case "help":
        Controller.help()
        break;
    case "register":
        Controller.register(data)
        break;
    case "addPatient":
        Controller.addPatient(data)
        break;
    case "login":
        Controller.login(data)
        break;

    case "logout":
        Controller.logout()
        break;

    default:
        Controller.help()
        break;
}