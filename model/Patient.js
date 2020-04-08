const fs = require('fs')

class Patient {

    constructor(id, username, password, diagnosis = []) {
        this.id = id
        this.username = username
        this.password = password
        this.diagnosis = diagnosis
        this.isLogin = false
    }


    static findAll() {
        const data = fs.readFileSync('./data/dataPatients.json', 'utf8')
        return data
    }

    static addOne(params) {
        const dataEmployees = fs.readFileSync('./data/dataEmployees.json', 'utf8')
        for(let i = 0; i < dataEmployees.length; i++){
            if(dataEmployees[i].isLogin === true){
                let loggedInRole = dataEmployees[i].role
            }
        }
        if(loggedInRole === 'doctor'){
            let data = this.findAll()
            let newID = data[data.length - 1].id + 1
            const newData = new Patient(newID, params[0], params[1], params.slice(2))
            data.push(newData)
            fs.writeFileSync('./data/dataPatients.json', data)
            return true
        }else{
            return false
        }
    }
}


module.exports = Patient