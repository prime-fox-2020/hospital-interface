const Employee = require('../Model/Employee')
const View = require('../Views/View')

class Controller {

  static register(params) {
    Employee.createOne(params, (err, msg) => {
      if (err)
        View.registerErr(msg)
      else
        View.registerSuccess(msg)
    })
  }

  static login(params) {
    Employee.login(params, (err, msg) => {
      if (err)
        View.loginErr(msg)
      else
        View.loginInfo(msg)
    })
  }
}

module.exports = Controller