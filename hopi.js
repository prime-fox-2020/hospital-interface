const control = require('./controllers')

main = () => {
    let command = process.argv.slice(2);

    switch (command[0]) {
        case 'login' : {
            control.login(command[1], command[2])
        }; break;

        case 'logout' : control.logout(); break;

        case 'add' : {

            switch (command[1]) {
                case 'pegawai' : {
                    control.register('employee', `${command[2]},${command[3]},${command[4]},${command[5]}`);
                }; break;

                case 'pasien' : {
                    control.register('patient', `${command[2]},${command[3]}`)
                }; break;
            }

        }; break;

        case 'help' : {
            control.help();
        }; break;
    }
}

main();
