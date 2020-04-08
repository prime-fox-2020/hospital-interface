
controllers = require(`./controller.js`)

argv = process.argv.slice(2)
params = argv.slice(1)

switch(argv[0]){
    case 'help' : controllers.listHelp(); break
    case 'login': controllers.login(argv[1],argv[2]) ;break
    case 'register': controllers.register(params) ; break
    default : controllers.listHelp() ;break

}