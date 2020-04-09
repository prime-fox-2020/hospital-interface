let Employee = require('../model/employee')
let View = require('../view/view')
let Patient = require('../model/patient')



class Controller {
    static register(name, position, username, password){
        Employee.register(name, position, username, password,(err,data)=>{
            if(err){
                View.viewmessage(err)
            }
                View.viewmessage()

            //tambahin view}
        })
    }

    static list(){
    Employee.list((err,data)=>{
        if(err){
            View.list(err)
        }else{
            View.list(data)

        }
    })
    }
    
    static login(username,password){
        Employee.login(username,password,(err,data)=>{
            if(err){
                View.viewloginerror(username)
            }else{
                View.viewlogin(username)
            }

        })
    }

    static logout(){
        Employee.logout((err,data)=>{
            if(err){
                throw err
            }else{
                console.log(data)
            }
        })
    }

    static registerPatient(name,diagnosis){
        Patient.register(name,diagnosis,(err,data)=>{
            if(err){
                View.viewRegisterError(err)
            }else{
                console.log(data)
                console.log(`berhasil`)
                // View.viewRegister(data)
            }
        })
    }



}

module.exports = Controller