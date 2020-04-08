class View {

    static err(error) {
        console.log(error);
    }

    static message(msg) {
        // console.clear();
        console.log('SUCCESS');
        console.log('===========');
        console.log(msg);
    }
    
    static login(success, msg) {
        // console.clear();
        console.log(success);
        console.log('===========');
        console.log(msg);
    }
}

module.exports = View