
const controllers = require(`./controller`)

class View {
    static listHelp(){
        console.log(
            `
            $node index.js
            $node index.js help
            $node index.js login <username> <password>
            `)

    }
    static login(username,password){
        if(username && password){
            console.log(`selamat login ${username}`)
        }else{
            console.log(`masukan username dan password`)
        }
    }


}


module.exports = View