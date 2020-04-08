let fs = require('fs')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.isLogin = false
  }
}

class Model {
  static readDB(callback){
    fs.readFile('./db.json', 'utf8', (err,data) =>{
      if (err){
        callback(err,null);
      } else {
        data = JSON.parse(data)
        callback(null,data);
      }
    })
  }

  static writeDB(parsed, callback){
    fs.writeFile('./db.json', JSON.stringify(parsed, null, 2), (err)=>{
      if(err){
        callback(err, null);
      } else {
        callback(null, 'Sucessfully added employee');
      }
    })
  }

  static readDBP(callback){
    fs.readFile('./dbp.json', 'utf8', (err,data) =>{
      if (err){
        callback(err,null);
      } else {
        data = JSON.parse(data)
        callback(null,data);
      }
    })
  }

  static writeDBP(parsed, callback){
    fs.writeFile('./dbp.json', JSON.stringify(parsed, null, 2), (err)=>{
      if(err){
        callback(err, null);
      } else {
        callback(null, 'Sucessfully added patient');
      }
    })
  }

  static register(params, callback){ //name, position, username, password
    Model.readDB((err,data)=>{
      if(err){
        callback(err, null)
      } else {
        data.push(new Employee(params[0],params[1],params[2],params[3]))
        Model.writeDB(data, (err,data1) =>{
          if(err){
            callback(err, null)
          } else {
            callback(null, data1)
          }
        })
      }
    })
  }

  static login(params, callback){
    let message = ''
    Model.readDB((err, data)=>{
      if(err){
        callback(err,null)
      } else {
        let flag = false
        for(let a = 0; a < data.length; a++){
          if(data[a].isLogin === true){
            callback(null, 'please logout first')
            flag = true
            break;
          }
        }
        if(flag === false){
          for(let b = 0; b < data.length; b++){
            if(data[b].username === params[0] && data[b].password === params[1]){
              data[b].isLogin = true
              message = `Welcome back, ${data[b].name}`
              flag = true
              break;
            }
          }
        } else {
          if(flag === false){
            callback(null, 'wrong username or password')
          } else {}
        }
        Model.writeDB(data, (err)=>{
          if(err){
            callback(err,null)
          } else {
            callback(null, message)
          }
        })
      }
    })
  }

  static logout(callback){
    Model.readDB((err,data)=>{
      if(err){
        callback(err,null)
      } else {
        let flag = false
        for(let a = 0; a < data.length; a++){
          if(data[a].isLogin === true){
            flag = true
            data[a].isLogin = false
            break;
          }
        }
        if(flag === false){
          callback(null, `You're not logged into any account yet`)
        } else {
          Model.writeDB(data, (err)=>{
            if(err){
              callback(err,null)
            } else {
              callback(null, 'logout success')
            }
          })
        }
      }
    })
  }

  static addPatient(param, callback){ //id, name, diagnosis
    Model.readDB((err,dataE)=>{
      if(err){
        callback(err,null)
      } else {
        let login = false
        for(let a = 0; a < dataE.length; a++){
          if(dataE[a].isLogin === true){
            login = true
            if(dataE[a].position === 'Doctor'){
              Model.readDBP((err, data)=>{
                if(err){
                  callback(err, null)
                } else {
                  let name = param[0]
                  let diagnosis = param.slice(1)
                  if(data.length === 0){
                    data.push(new Patient(1, name, diagnosis))
                  } else {
                    data.push(new Patient((data[data.length - 1].id + 1), name, diagnosis))
                  }
                  Model.writeDBP(data, (err,data1)=>{
                    if(err){
                      callback(err,null)
                    }else{
                      callback(null, data1)
                    }
                  })
                }
              })
            } else {
              callback(null, 'This feature can only be accessed by Doctors')
            }
          }
        }
        if(login !== true){
          callback(null, 'please log in first')
        }
      }
    })
  }
}

module.exports = Model
