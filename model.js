const fs = require('fs')
const Controller = require('./controller')
const VIew = require('./view')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static dataEmployee(){
    let alpha = fs.readFileSync('./patient.json','utf8')
    let beta = JSON.parse(alpha)

    return beta
  }
}

class Employee {
  constructor(name, position, username, password, login = false) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = login
  }

  static dataEmployee(){
    let alpha = fs.readFileSync('./employee.json','utf8')
    let beta = JSON.parse(alpha)

    return beta
  }

  static register (name, position, username, password){
    let data = this.dataEmployee()
    data.push({
      ID: Number(data.length-1) + 1,
      name: name,
      position: position,
      username: username,
      password: password,
      login: false
    })
    console.log(`Save data success {username: ${data[data.length-1].username}, password: ${data[data.length-1].password}, role: ${data[data.length-1].position}}. Total employee: ${data.length}`)
    let newData = JSON.stringify(data, null, 4)
    fs.writeFileSync('./employee.json',newData)
  }
}

class Doctor extends Employee {
  constructor (name, position, username, password, login){
    super(name, position, username, password, login)
  }
}

class OfficeBoy extends Employee {
  constructor (name, position, username, password, login){
    super(name, position, username, password, login)
  }
}

class Admin extends Employee {
  constructor (name, position, username, password, login){
    super(name, position, username, password, login)
  }
}

class Receptionist extends Employee {
  constructor (name, position, username, password, login){
    super(name, position, username, password, login)
  }
}

module.exports = {Patient, Employee}