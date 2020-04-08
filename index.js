const Controller = require('./controller')

let command = process.argv[2]

let input = process.argv.slice(3)

let commandList = ['help', 'login <username> <password>', 'logout', 'register <name> <position> <username> <password>, addPatient <id> <name> <diagnosis>']

switch(command){
  case "help":
    Controller.help(commandList)
  break
  case "login":
    Controller.login(input[0], input[1])
  break
  case "logout":
    Controller.logout()
  break
  case "register":
    Controller.register(input[0], input[1], input[2], input[3])
  break
  case "addPatient":
    Controller.addPatient(input[0], input[1], input[2])
  break
  default:
    Controller.help(commandList)
  break
}