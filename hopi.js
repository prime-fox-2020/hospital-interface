const control = require('./controllers')

main = () => {
    let command = process.argv.slice(2);
    // connect to database;
    switch (command[0]) {
        case 'login' : {
            control.login(command[1], command[2])
        }; break;

    }
}

main();
