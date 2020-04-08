
controllers = require(`./controller.js`)

argv = process.argv.slice(2)
params = argv.slice(1)

switch(argv[0]){
    case 'help' : controllers.listHelp(); break
    case 'register': controllers.register(params) ; break
    case 'login': controllers.login(params) ;break
    case `addPatient`: controllers.addPatient(params) ;break
    default : controllers.listHelp() ;break

}