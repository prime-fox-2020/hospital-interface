const View = require('./view')
const Model = require('./model/model')

class Controller {
  static help() {
    View.help()
  }

  static list() {
    Model.findAll((err, data)=>{
      if (err){
        View.printError(err)
      } else {
        View.printSuccess(data)
      }
    })
  }

  static addEmployee(params){
    Model.createOne(params, (err,data)=>{
      if (err){
        View.printError(err)
      } else {
        View.printSuccess(data)
      }
    })
  }

  static login(params){
    Model.login(params, (err,data)=>{
      if (err){
        View.printError(err)
      } else {
        View.printSuccess(data)
      }
    })
  }

  static addPatient(params){
    Model.createPatient(params, (err,data)=>{
      if (err){
        View.printError(err)
      } else {
        View.printSuccess(data)
      }
    })
  }

  static logout(){
    Model.logout((err,data)=>{
      if (err){
        View.printError(err)
      } else {
        View.printSuccess(data)
      }
    })
  }
}


module.exports = Controller