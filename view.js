
const controllers = require(`./controller`)

class View {
    static listHelp(){
        console.log(
            `
            $node index.js
            $node index.js help
            $node index.js register <namaPanggilan> <username> <password> <potition>
            $node index.js login <username> <password>
            $node index.js addPatient <id> <name> <task_diagnosis>
            $node index.js logout
            `)
    }

    static registerSalah (){
        console.log(`Format Salah !, Input :$node index.js register <namaPanggilan> <username> <password> <potition>`)

    }

    static printSucces(data){
        console.log(data)
    }

    static printError(){
        console.log(`any eror`)
    }


}


module.exports = View