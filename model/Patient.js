const fs = require('fs')

class Patient {
    constructor(id, name, diagnosis = []) {
        this.id = id
        this.name = name
        this.diagnosis = diagnosis
    }

    static findAll() {
        let data = fs.readFileSync('./data/dataPatients.json', 'utf8')
        data = JSON.parse(data)
        return data
    }

    static save(data) {
        let dataStringify = JSON.stringify(data, null, 2)
        fs.writeFileSync('./data/dataPatients.json', dataStringify)
    }

    static addOne(params) {
        let loggedInRole
        const dataEmployees = JSON.parse(fs.readFileSync('./data/dataEmployees.json', 'utf8'))
        for(let i = 0; i < dataEmployees.length; i++){
            if(dataEmployees[i].isLogin === true){
                loggedInRole = dataEmployees[i].role
            }
        }

        if(loggedInRole === 'doctor'){
            let data = this.findAll()
            let newID = data[data.length - 1].id + 1
            const newData = new Patient(newID, params[0], params.slice(1))
            data.push(newData)
            this.save(data)
            return true
        }else{
            return false
        }
    }
}

module.exports = Patient