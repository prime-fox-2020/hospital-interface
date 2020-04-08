const Model = require('./model');
const View = require('./view');

class Controller {
  static register(params) {
    Model.createData(params, (err, data, total) => {
      if (err) {
        View.showError(data);
      } else {
        View.showCreate(data, total);
      }
    })
  }

  static login(user) {
    Model.login(user, (log, err) => {
      if (log) {
        View.showLogin(log);
      } else {
        View.loginFail(err);
      }
    })
  }

  static addPatient(params) {
    Model.addPatient(params, total => {
      if (total) {
        View.addPatient(total);
      } else {
        View.notDokter();
      }
    })
  }

  static logout() {
    Model.logout(()=>View.logout());
  }

  static command(check) {
    View.command(check);
  }
}

module.exports = Controller;