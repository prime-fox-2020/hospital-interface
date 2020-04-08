const fs = require('fs')

// const Patient = require('./patient')

class EmployeeModel {
  constructor(id, name, position, username, password, logged_in){
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.logged_in = logged_in
  }

  static readDataEmployeeFromJSON(callback1){
    fs.readFile('./data/employee.json', 'utf-8',(err,data) => {
      if (err){
        callback1(err,null)
      } else {
        const employeeDataParse = JSON.parse(data)
        callback1(null, employeeDataParse)
      }
    })
  }

  static writeDataEmployeeToJSON(employeeDataParse,type,callback2){
    const employeeDataStringify = JSON.stringify(employeeDataParse,null,2)
    fs.writeFile('./data/employee.json',employeeDataStringify,(err) =>{
      if (err){
        callback2(err,null)
      } else {
        if (type == 'register'){
          callback2(null, `Data employee was saved, Total employee : ${employeeDataParse.length}`)
        } else if (type == 'login'){
          callback2(null, `User has logged in successfully`)
        } else if (type == 'logout'){
          callback2(null, `User has been successfully logout!`)
        }
      }
    })
  }

  static viewAllEmployee(cb1){
    EmployeeModel.readDataEmployeeFromJSON((err,employeeDataParse) => {
      if (err){
        cb1(err,null)
      } else {
        
        let employeeDataConvert = []
        for (let i = 0; i<employeeDataParse.length; i++){
          employeeDataConvert.push(new EmployeeModel(employeeDataParse[i].id, employeeDataParse[i].name, employeeDataParse[i].position, employeeDataParse[i].username, employeeDataParse[i].password, employeeDataParse[i].logged_in))
        }
        cb1(null, employeeDataConvert)
      }
    })
  }

  static registerEmployee(param, cb2){
    EmployeeModel.readDataEmployeeFromJSON((err, employeeDataParse) => {
      if (err){
        cb2(err,null)
      } else {
        
        let newID = 0
        if (employeeDataParse.length === 0){
          newID = 1
        } else {
          newID = employeeDataParse[employeeDataParse.length - 1].id + 1
        }
        let obj = {}
        obj.id = newID,
        obj.name = param[0],
        obj.position = param[1],
        obj.username = param[2],
        obj.password = param[3],
        obj.logged_in = false
        employeeDataParse.push(obj)

        EmployeeModel.writeDataEmployeeToJSON(employeeDataParse,'register', cb2)
      }
    })
  }
  static loginEmployee(param, cb3){
    EmployeeModel.readDataEmployeeFromJSON((err,employeeDataParse) => {
      if (err){
        cb3(err,null)
      } else {
        let countLogin = false
        let nameLogin = ''
        for (let i = 0; i<employeeDataParse.length; i++){
          if (employeeDataParse[i].logged_in === true){
            countLogin = true
            nameLogin += employeeDataParse[i].name
          }
        }
        if (countLogin){
          cb3(`User ${nameLogin} still logged in, you need to logout first`,null)
        } else {
          let loginUsername = param[0]
          let loginPassword = param[1]
          let flag = false
          for (let i = 0; i<employeeDataParse.length; i++){
            if (employeeDataParse[i].username == loginUsername && employeeDataParse[i].password == loginPassword ){
              employeeDataParse[i].logged_in = true
              flag = true
            } 
          }
          if (!flag){
            cb3(`Username / Password Wrong`,null)
          } else {
            EmployeeModel.writeDataEmployeeToJSON(employeeDataParse,'login',cb3)
          }
        }
      }
    })
  }
  static logoutEmployee(cb4){
    EmployeeModel.readDataEmployeeFromJSON((err,employeeDataParse) => {
      if (err){
        cb4(err,null)
      } else {
        let countLogin = false
        let loginID 
        for (let i = 0; i<employeeDataParse.length; i++){
          if (employeeDataParse[i].logged_in === true){
            countLogin = true
            loginID = i
          }
        }
        if (countLogin){
          employeeDataParse[loginID].logged_in = false
        } else {
          cb4(`No one is currently login. Please Log-in first`,null)
        }
        EmployeeModel.writeDataEmployeeToJSON(employeeDataParse,'logout',cb4)
      }
    })
  }

}

module.exports = EmployeeModel