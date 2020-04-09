const fs = require ('fs')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  //// ini isinya buat baca file ajah
  static list(callback){
    fs.readFile('./data/employee.json','utf8',(err,data) => {
      if(err) {
        callback(err,null)
      } else {
        let employees = [];
        let dataparse = JSON.parse(data)
        
        for(var i = 0 ; i < dataparse.length ; i++){
          employees.push(new Employee(dataparse[i].name,dataparse[i].position,
            dataparse[i].username,dataparse[i].password))
        }
        callback(null, employees)
      }
    })
  }
  
  
  static register(name, position, username, password,callback){
    this.list((err,data)=>{
      if(err){
        callback(err,null)
      }else{
      let newemployess = data

      if(position == 'Admin'){
        newemployess.push(new Admin(name,position,username,password))
      }else if(position == 'Doctor'){
        newemployess.push(new OfficeBoy(name,position,username,password))
      }else if(position == 'OfficeBoy'){
        newemployess.push(new Doctor(name,position,username,password))
      }else if(position == 'Receptionist'){
        newemployess.push(new Receptionist(name,position,username,password))
      }

      fs.writeFile('./data/employee.json',JSON.stringify(newemployess,null,4), (err )=>{
        if(err){
          callback(err,null)
        } else{
          callback(null,newemployess)
        }
      })

    }

    })
  }

  static login(username,password,callback){
    let newLogin ;
    let loginData = [];

    this.list((err,data)=>{
      if(err){
        callback(err,null)
      }else{
       let loginemployee = data
       let logintrue = false
       for(var i = 0 ; i < loginemployee.length ; i ++){
        if(loginemployee[i].username == username && loginemployee[i].password == password){
          logintrue = true
          newLogin = new EmployeeLogin(username,password,loginemployee[i].position)
          loginData.push(newLogin);
          fs.writeFile(`./login.json`, JSON.stringify(loginData, null, 4), (err) => {
            if (err) {
            callback(err,null)
            }else{
            callback(null, newLogin)
              }
          })
        }
      }
      if (logintrue === false) {
          callback(username,null)
      }
      }
    })
  }

  static logout(cb){

  fs.readFile('./login.json','utf8',(err,data) => {
      if(err) {
        cb(err,null)
      } else {
        let dataLoginParse = JSON.parse(data)
        if(dataLoginParse[0].username==""){
          cb(null,"tidak ada yang bisa di logout")
        }else{
          cb(null,`memproses logout ${dataLoginParse[0].username}`)
          let newLogin = new EmployeeLogin("","")
          let loginData = [];
            
          loginData.push(newLogin)
        
          fs.writeFile(`./login.json`, JSON.stringify(loginData, null, 4), (err,data) => {
            if (err) {
            cb(err,null)
            }else{
            cb(null, "berhasil logout")
              }
          })
        }
      }
    })
  }


}

class Admin extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password)
  }
}
class OfficeBoy extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password)
  }
}
class Doctor extends Employee {
  constructor(name, position, username, password) {
    super(name, position, username, password)
  }
}
class Receptionist extends Employee {
  constructor(name, role, username, password, isLogin) {
    super(name, role, username, password, isLogin)
  }
}





  class EmployeeLogin {
    constructor(username, password,position) {
      this.username = username;
      this.password = password;
      this.position = position;
    }
  }
  


module.exports = Employee