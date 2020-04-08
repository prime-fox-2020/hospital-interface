'use strict'

const Controller = require('./controller');

class View {
    static showData(data, params) {
        console.log(`Data ${params}\n==============`);
        console.log(data);
    }

    static showMessage(message) {
        console.log(message);
    }

    static showError(message) {
        console.log(message);
    }

    static default() {
        console.log('unknown command!\n- list\n- register\n- addPatient\n- login\n- logout');
    }
}

module.exports = View;