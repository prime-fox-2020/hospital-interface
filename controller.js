
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

}


module.exports= Controllers