
controlers = require(`./controller.js`)

argv = process.argv.slice(2)

switch(argv[0]){
    case 'help' : controlers.listHelp(); break
    case 'login': 
        if(argv[1] && argv[2]){
            controlers.login(argv[1],argv[2])
        }else{
            controlers.login()
        }
        ;break

    default : controlers.listHelp() ;break

}

