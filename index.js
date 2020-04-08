const Controller = require("./controller")
const command = process.argv.slice(2)
const perintah = command[0]
const name = command[1]
const userName = command[2]
const penyakit = process.argv.slice(5)
const password = command[3]
const position = command[4]

if(perintah == "register"){
    Controller.register(name,userName,password,position)
}else if(perintah == "login"){
    Controller.login(name,userName)
}else if(perintah == "addPatient"){
    Controller.addPatient(name,userName,penyakit)
}else if(perintah == "logout"){
    Controller.logout()
}
