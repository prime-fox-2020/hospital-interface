const Model = require('../models/model');
const View = require('../views/view');

class Controller{
    static listEmployee(){
        Model.listEmployee((err, data) => {
            if(err){
                throw err;
            }
            View.listEmployee(data);
        })
    }

    static register(value){
        Model.register(value, (err, data) => {
            if(err){
                throw err;
            }
            View.register(value[0], value[3]);
        })
    }

    static login(username_password){
        Model.login(username_password, (err, data) => {
            if(err){
                throw err;
            }

            if(typeof data === 'string'){
                View.login(data)
            } else {
                View.login(username_password);
            }
        })
    }
}

module.exports = Controller;