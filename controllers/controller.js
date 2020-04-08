const Model = require('../models/model');
const View = require('../views/view');

class Controller{
    static listEmployee(){
        Model.listEmployee((err, data) => {
            if(err){
                View.errorMsg();
            } else {
                View.listEmployee(data);
            }
        })
    }

    static listPatient(){
        Model.listPatient((err, data) => {
            if(err){
                View.errorMsg();
            } else {
                View.listPatient(data);
            }
        })
    }

    static register(value){
        Model.register(value, (err, data) => {
            if(err){
                View.errorMsg();
            } else {
                View.register(value[0], value[3]);
            }
        })
    }

    static login(username_password){
        Model.login(username_password, (err, data) => {
            if(err){
                View.errorMsg()
            } else {
                if(typeof data === 'string'){
                    View.login(data);
                } else {
                    View.login(username_password);
                }
            }

        })
    }

    static addPatient(patient){
        Model.addPatient(patient, (err, data) => {
            if(err){
                View.errorMsg();
            } else {
                if(typeof data === 'string'){
                    View.addPatient(data);
                } else {
                    View.addPatient(patient);
                }
            }

        })
    }

    static logout(){
        Model.logout((err, data) => {
            if(err){
                View.errorMsg();
            } else {
                View.logout();
            }
        })
    }
}

module.exports = Controller;