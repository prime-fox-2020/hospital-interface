const Model = require('./model')
const View = require('./view')

class Controller{
  static register(params){
   Model.register(params, function(err, data){
     if(err){
       View.printError(err)
     }else {
      
       View.printSucces(data)
       
     }
   })
  }

  static login(params){
    Model.login(params, function(err, data){
      if (err) {
        View.printError(err)
      } else {
        View.login(data)
      }
    })
  }

  static addPatient(params){
    Model.addPatient(params, function(err, data){
      if(err){
        View.printError(err)
      }else{
        View.addPatient(data)
      }
    })
  }
}


module.exports = Controller