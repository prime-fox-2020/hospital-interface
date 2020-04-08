


class View {
    static help () {
        console.log('node index.js');
        console.log('node index.js help');
        console.log('node index.js addEmployee <name> <position> <username> <password>');
        console.log('node index.js register <username> <password> <position>')
        console.log('node index.js addEmployee <name> <diagnosis>')
    }

    static display (param) {
        console.log(param);
    }
}



module.exports = View