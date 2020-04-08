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

    static save(data) {
        let dataStringify = JSON.stringify(data, null, 2)
        fs.writeFileSync('./data/dataEmployees.json', dataStringify)
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
        this.save(data)
        return [newData, data.length]
    }

    static setLogin(id) {
        let data = this.findAll()
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                data[i].isLogin = true
            }
        }
        this.save(data)
    }

    static setLogout(id) {
        let data = this.findAll()
        for(let i = 0; i < data.length; i++){
            if(data[i].id === id){
                data[i].isLogin = false
            }
        }
        this.save(data)
    }
}


module.exports = Employee