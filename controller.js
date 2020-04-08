const Model = require("./model.js")
const View = require("./view.js")

class Controller{
    static register(param){
        Model.register(param,(err,data)=>{
            if(err){
                View.printFailed(err)
            }else{
                View.printDone(data)
            }
        })  
        
    }
    static login(param){
        Model.login(param,(err,data) =>{
            if(err){
                View.printFailed(err)
            }else{
                View.printDone(data)
            }
        })
    }
    static addPatient(param){
        Model.addPatient(param,(err,data) =>{
            if(err){
                View.printFailed(err)
            }else{
                View.printDone(data)
            }
        })
    }

    static logout(){
        Model.logout((err,data)=>{
            if(err){
                View.printFailed(err)
            }else{
                View.printDone(data)
            }
        })
    }
}

module.exports = Controller
