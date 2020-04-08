const Model = require('./model')

class View {
    static message(message){
        console.log(message)
    }
    static list(data){
        console.table(data)
    }
}

module.exports = View