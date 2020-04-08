const Controller = require('./controller.js')

let command = process.argv[2]
let objData = {
    username: process.argv[3],
    password: process.argv[4],
    role: process.argv[5]
}

if (command === 'register') {
    Controller.register(objData)
} else {
    console.log(('Terjadi salah input..!\n'));
    console.log(('Ketik node index.js register <username> <password> <role>'));
}