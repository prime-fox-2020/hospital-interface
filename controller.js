'use strict'
const Model = require('./model.js')
const View  = require('./view.js')


class Controller{

  static register(name, password, username, position){
    Model.create(name, password, username, position, (err, data) => {
      if(err) View.errorMessage(err);
      else View.register(data[0], data[1]);
    });

  }

  static authentication(name, password){
    Model.authenticate(name, password, (err, data) => {
      if(err) View.errorMessage(err);
      else View.authentication(data)
    })
  }

  static addPatient(id, name, disease){
    Model.addPatient(id, name, disease, (err, data) => {
      if(err) View.errorMessage(err);
      else View.addPatient(data);
    });
  }

  static logout(){
    Model.logout((err, data) => {
      if(err) View.errorMessage(err);
      else View.logout(data);
    });
  }
}

module.exports = Controller;