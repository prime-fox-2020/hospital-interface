const View = require("../view/view");
const Employee = require("../model/employee");
const Patient = require("../model/patient");
class Controller {
  static help() {
    View.help();
  }
  static register(data) {
    Employee.register(data, function(err, employees) {
      if (err) {
        View.error();
      } else {
        View.viewData(employees);
      }
    });
  }

  static login(data) {
    Employee.login(data, function(
      err,
      dataChekcked,
      flagCheckUsr,
      flagDoubleLogin
    ) {
      if (err) {
        View.error();
      } else {
        if (flagDoubleLogin) {
          View.viewErrorLogin();
        } else if (!flagCheckUsr) {
          View.viewDisplay("Username / Password Salah");
        } else {
          View.viewDisplay(`user ${dataChekcked} Log In Succsesfully`);
        }
      }
    });
  }

  static logout() {
    Employee.logout(function(err, cblogout) {
      View.viewDisplay(cblogout);
    });
  }

  static addPatient(data) {
    Patient.addPatient(data, function(err, patient) {
      if (err) {
        View.error();
      } else {
        View.viewDisplay(
          `data pasien berhasil ditambahkan. Total pasien ada : ${patient.length -
            1}`
        );
      }
    });
  }
}
module.exports = Controller;
