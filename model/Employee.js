const fs = require('fs')

class Employee {
    
    constructor(id, username, password, role) {
        this.id = id
        this.username = username
        this.password = password
        this.role = role
        this.isLogin = false
    }


    static findAll() {
        let data = fs.readFileSync('./data/dataEmployees.json', 'utf8')
        data = JSON.parse(data)
        return data
    }

    static addOne(params) {
        let data = this.findAll()
        let newID
        if(data.length === 0){
            newID = 1
        }else{
            newID = data[data.length - 1].id + 1
        }
        const newData = new Employee(newID, params[0], params[1], params[2])
        data.push(newData)
        let dataStringify = JSON.stringify(data, null, 2)
        fs.writeFileSync('./data/dataEmployees.json', dataStringify)
        return [newData, data.length]
    }
}


module.exports = Employee