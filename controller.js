
const modelEmployee = require(`./model-employee`)
const modelPatien = require(`./model-Patient`)
const view = require(`./view`)


class Controllers{

    static listHelp(){
        view.listHelp()
    }

    static login(username,password){
        view.login(username,password)
    }

    static register(params){
        if(params[0] && params[1] && params[2] && params[3]){
            modelEmployee.register(params,(err,data)=>{
                if(err){
                    view.printError()
                }else{
                    view.printSucces(data)
                }
            })
        }else{
            view.registerSalah()
        }
    }

}


module.exports= Controllers