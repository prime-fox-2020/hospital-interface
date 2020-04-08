
const modelEmployee = require(`./model-employee`)
const modelPatien = require(`./model-Patient`)
const view = require(`./view`)


class Controllers{

    static listHelp(){
        view.listHelp()
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

    static login(params){
        modelEmployee.login(params,(err,data)=>{
            if(err){
                view.printError()
            }else{
                view.printSucces(data)
            }
        })
    }

    static addPatient(params){
        modelEmployee.cekLogin((err,data) =>{
            if(err){
                view.printError()
            }else if(data) {
                modelPatien.addPatient(params,(err,data)=>{
                    if(err){
                        view.printError()
                    }else{
                        view.printSucces(data)
                    }
                })
            }else{
                view.printSucces(`tidak memiliki akses untuk add patient`)
            }
        })
    }

}


module.exports= Controllers