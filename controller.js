'use strict'

const Model = require('./model');
const View = require('./view');

class Controller {
    
    static default() {
        View.default();
    }
    
    static login(params) {
        Model.login(params, (err, message)=>{
            if (err) View.showError(err);
            else View.showMessage(message);
        });
    }

    static logout() {
        Model.logout((err, message)=>{
            if (err) View.showError(err);
            else View.showMessage(message);
        });
    }
    
    static showData(params) {
        Model.showData(params, (err, data)=>{
            if (err) View.showError(err);
            else View.showData(data, params);
        });
    }

    static manageData(params) {
        Model.manageData(params, (err, message)=>{
            if (err) View.showError(err);
            else View.showMessage(message);
        });
    }
}

module.exports = Controller;