const Model = require('./model')
const View = require('./view')

class Controller {
  static help (commandList){  
    View.help(commandList)
  }

  static login (username, password){
    View.login(username, password)
  }

  static logout (){
    View.logout()
  }

  static register (name, position, username, password){
    Model.Employee.register(name, position, username, password)
  }
  
}

module.exports = Controller