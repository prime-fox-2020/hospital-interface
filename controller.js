let View = require('./view')
let Model = require('./model')
class Controller {
    static help(){
        View.help();
    }
    static register(params){
        Model.register(params,(err,data) =>{
            if(err){
                View.display(err);
            } else {
                View.display(data)
            }
        });
    }
    static login(params){
        Model.login(params,(err,data) =>{
            if(err){
                View.display(err);
            } else {
                View.display(data)
            }
        });
    }

    static logout(){
        Model.logout((err,data)=>{
            if(err){
                View.display(err)
            } else {
                View.display(data)
            }
        })
    }

    static addPatient(param){
        Model.addPatient(param, (err, data)=>{
            if(err){
                View.display(err)
            } else {
                View.display(data)
            }
        })
    }
}

module.exports = Controller