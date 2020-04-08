const EmployeeFactory = require('./model').EmployeeFactory
const Patient = require('./model').Patient
const View = require('./view')

class Controller {
    static message(message){
        View.message(message)
    }
    static list(){
        EmployeeFactory.list((err,data)=>{
            if(err){
                View.message(err)
            }else {
                View.list(data)
            }
        })
        
    }
    static register(params){
        // console.log(params)
        EmployeeFactory.register(params,(err,data)=>{
            if(err){
                View.message(err)
            }else{
                View.message(`> Save Data Success! ${data[0]} Total EmployeeFactory : ${data[1]}`)
            }
        })
    }
    static login(params){
        EmployeeFactory.login(params,(err,data)=>{
            if(err){
                View.message(err)
            }else {
                if(data[0]==1){
                    View.message(`User ${data[1]} logged in Successfully!!`)
                }else{
                    View.message("Username / pasdsword wrong!")
                }
                
            }
        })
        // EmployeeFactory.login(params)
        // console.log("login")
    }
    static logout(params){
        EmployeeFactory.logout(params,(err,data)=>{
            if(err){
                View.message(err)
            }else {
                View.message("User has been successfully logout! ")
                
            }
        })
    }
    static add(params){
        EmployeeFactory.add(params, (err,data)=>{
            if(err){
                View.message(err)
            }else{
                View.message("Success added!")
            }
        })
    }
}

module.exports = Controller