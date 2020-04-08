const fs = require('fs');
const motd_file = fs.readFileSync('./help.txt', 'utf8')

class Messaging {

    static showErrors(err, descriptions) {
        // console.clear();
        switch (err) {
            case 'password': console.log(`\nYour password didn't match\n`); break;
            case 'access_denied' : console.log(`\nCannot register new patient, you must be a doctor to add new patient\nCurrent Role: ${descriptions}\n`); break;
            case 'in_session' : console.log(`\nUser ${descriptions} is still login, you'll need to log out first\n`); break;
            case 'need_login' : console.log(`\nYou have to login first\nHow To Login : node hopi [login] [username] [password]\n`); break;
            default : console.log(`\nUnknown Error has occured, please stand by....\n`);
        }
    }

    static showMessage(type, content, table, totalRows) {

        switch (type) {
            case 'insert': console.log(`\nYou've been add ${JSON.stringify(content)} into ${table}\n1 Row Affected\nTotal Data: ${totalRows}`); break;
            case 'show_list' : console.table(content); break;
            case 'motd' : console.log(`\n${motd_file}\n`); break;
            case 'login_success' : console.log(`\nUser ${content} has succesfully login`); break;
            case 'logout' : console.log(`\nUser ${content} has been logout\n`); break;
        }
    }
}

module.exports = Messaging;