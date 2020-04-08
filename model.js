const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static dataPatient(){
    let alpha = fs.readFileSync('./patient.json','utf8')
    let beta = JSON.parse(alpha)

    return beta
  }

  static addPatient (name, diagnosis){
    let dataPatients = Patient.dataPatient()
    let dataEmployee = Employee.dataEmployee()
    let checkLogin = false
    for (let i = 0; i < dataEmployee.length; i++){
      if (dataEmployee[i].position == 'doctor' && dataEmployee[i].login == true){
        checkLogin = true
      }
    }
    if (checkLogin == true){
      dataPatients.push({
        ID: dataPatients.length+1,
        name: name,
        diagnosis: diagnosis
      })
      console.log(`Data pasien berhasil ditambahkan. Total data pasien: ${dataPatients.length}`)
    } else {
        console.log(`Tidak memiliki akses untuk add patient`)
    }
    let newData = JSON.stringify(dataPatients, null, 4)
    fs.writeFileSync('./patient.json',newData)
  }
}

class Employee {
  constructor(ID, name, position, username, password, login = false) {
    this.ID = ID
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
    if (position == 'doctor'){
      data.push(new Doctor(data.length+1, name, position, username, password))
    } else if (position == 'officeBoy'){
      data.push(new OfficeBoy(data.length+1, name, position, username, password))
    } else if (position == 'admin'){
      data.push(new Admin(data.length+1, name, position, username, password))
    } else if (position == 'receptionist'){
      data.push(new Receptionist(data.length+1, name, position, username, password))
    } else {
      return `Position not available`
    }
    console.log(`Save data success {username: ${data[data.length-1].username}, password: ${data[data.length-1].password}, role: ${data[data.length-1].position}}. Total employee: ${data.length}`)
    let newData = JSON.stringify(data, null, 4)
    fs.writeFileSync('./employee.json',newData)
  }
}

class Doctor extends Employee {
  constructor (ID, name, position = 'doctor', username, password, login){
    super(ID, name, position, username, password, login)
  }
}

class OfficeBoy extends Employee {
  constructor (ID, name, position = 'officeBoy', username, password, login){
    super(ID, name, position, username, password, login)
  }
}

class Admin extends Employee {
  constructor (ID, name, position = 'admin', username, password, login){
    super(ID, name, position, username, password, login)
  }
}

class Receptionist extends Employee {
  constructor (ID, name, position = 'receptionist', username, password, login){
    super(ID, name, position, username, password, login)
  }
}

module.exports = {Patient, Employee}