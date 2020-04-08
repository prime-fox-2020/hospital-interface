const Employee = require('../Model/Employee')
const View = require('../Views/View')

class Controller {

  static register(params) {
    Employee.createOne(params, (err, msg) => {
      if (err)
        View.errorMsg(msg)
      else
        View.successMsg(msg)
    })
  }

  static login() {
    Employee.login(params, (err, msg) => {
      if (err)
        View.errorMsg(msg)
      else
        View.successMsg(msg)
    })
  }
}

module.exports = Controller