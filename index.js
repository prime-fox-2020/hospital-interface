const argv=process.argv.slice(2)
const Controller=require(("./controller"))
const param=argv.slice(1)
switch (argv[0]) {
    case 'register':
        Controller.registerEmployee(param)
        break;

    case 'login':
        Controller.loginEmployee(param)
        break;

    case 'addPatient':
    Controller.addPatient(param)
    break;

    case 'logout':
    Controller.logout(param)
    break;
    default:
        break;
}