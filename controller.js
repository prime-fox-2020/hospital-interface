const Model = require('./model');
const Employee = require('./employee');
const Patients = require('./patients');
const View = require('./view');


class Controller {

  static help() {
    View.command();
  }


  static showEmployee() {
    Model.findAll( function(err, data){
      if (err) {
        View.error(err);
      }
      else {
        View.successShowDataE(data);
      }
    });
  }

  static registerE(input) {
    Model.createOneE( input, (err, data) => {
      if (err) {
        View.error(err);
      }
      else {
        View.success(data);
      }
    });
  }

  static login(input) {
    Model.login(input, (err, data) => {
      if (err) {
        View.error(err);
      }
      else {
        View.success(data);
      }
    });
  }

  static logout() {
    Model.logout(input, (err, data) => {
      if (err) {
        View.error(err);
      }
      else {
        View.success()
      }
    });
  }

  static showPatient() {
    Model.findAllP((err, data) => {
      if (err) {
        View.error(err);
      }
      else {
        View.successShowDataP(data);
      }
    });
  }

  static registerP(input) {
    Model.createOneP(input, (err, data) => {
      if (err) {
        View.error(err);
      }
      else {
        View.success(data);
      }
    });
  }

//END CONTROLLER ========================
}



module.exports = Controller;
