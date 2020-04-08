class View {

    static list(data){
     console.log(data)

    }
    static viewmessage(name){
        console.log(`mashuk ${name}`)
    }

    static viewlogin(username){
        console.log(`mashuk ${username}`)
    }

    static viewloginerror(username){
        console.log(`tidak ada ${username}`)
    }

}

module.exports = View