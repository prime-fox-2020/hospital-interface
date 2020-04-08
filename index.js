const Controller = require('./controller/Controller')

const argv = process.argv.slice(2)
const command = argv[0]
const params = argv.slice(1)

switch (command) {
    case 'register':
        Controller.register(params)
        break;

    default:
        break;
}