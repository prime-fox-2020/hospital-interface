const fs = require('fs')
const {Employee} = require('./modelPatientEmployee')

class ModelEmployee {
  static readFile(callback1){
    fs.readFile('./employee.json', 'utf8', (err,data) => {
      if(err) callback1(err, null)
      else{
        const dataParse = JSON.parse(data)
        callback1(null, dataParse)
      }
    })
  }

  static writeFile(data, type, callback2){
    const len = data.length
    const dataString = JSON.stringify(data, null, 2)
    fs.writeFile('./employee.json', dataString, (err) => {
      if(err) callback2(err, null)
      else {
        let template
        if(typeof type === 'object'){
          if(type.length === 3 && type[0]){
            template = `User ${type[1]} logged in successfully`
          }
          else if(type.length === 3 && !type[0]){
            template = `User ${type[1]} already logged in`
          }
          else if(type.length === 1){
            template = `Password wrong`
          }
          else{
            template = `Username / Password wrong`
          }
        }
        else if(type === 'register'){
          template = `Save data success {"username":"${data[len-1].username}", "password":${data[len-1].password}, "position":${data[len-1].position}"}. Total employee : ${len}`;
        }
        else if(type === 'logout'){
          template = `user has been successfully logout`
        }
        callback2(null, template)
      }
    })
  }

  static createOne(params, callback3){
    this.readFile((err, data) => {
      if(err) callback1(err, null)
      else{
        const result = data
        const obj = {
          "name" : params[0],
          "position" : params[1],
          "username" : params[2],
          "password" : params[3],
          "login_status" : false
        }
        result.push(obj)
        this.writeFile(result, 'register', callback3)
      }
    })
    
  }

  static login(params, callback4){
    this.readFile((err, data) => {
      if(err) callback1(err, null)
      else{
        let flagging = false
        let name
        for(let i = 0; i < data.length; i++){
          if(data[i].login_status){
            name = data[i].username
            flagging = true
            break
          }
        }
        if(flagging){
          callback4(null, `User ${name} still logged in. You need to logout first`)
        }
        else{
          const result = []
          const paramsLogin = []
          for(let i = 0; i < data.length; i++){
            if(data[i].username === params[0] && data[i].password === params[1] && !data[i].login_status){
              data[i].login_status = true
              paramsLogin.push(true)
              paramsLogin.push(data[i].username)
              paramsLogin.push(data[i].password)
            }
            else if(data[i].username === params[0] && data[i].password === params[1] && data[i].login_status){
              paramsLogin.push(false)
              paramsLogin.push(data[i].username)
              paramsLogin.push(data[i].password)
            }
            else if(data[i].username === params[0]){
              paramsLogin.push(data[i].username)
            }
            result.push(data[i])
          }
          this.writeFile(result, paramsLogin, callback4)
        }
      }
    })
  }

  static logout(callback5){
    this.readFile((err,data) =>{
      if(err) callback1(err, null)
      else{
        let flagging = false
        let name
        for(let i = 0; i < data.length; i++){
          if(data[i].login_status){
            name = data[i].username
            flagging = true
            break
          }
        }
        if(!flagging){
          callback5(null, `No user logged in`)
        }
        else{
          const result = []
          for(let i = 0; i < data.length; i++){
            if(data[i].username === name){
              data[i].login_status = false
            }
            result.push(data[i])
          }
          this.writeFile(result, 'logout', callback5)
        }
      }
    })
  }

  static checkPosition(callback6){
    this.readFile( (err, data) => {
      if(err) callback6(err, null)
      else{
        let position
        for(let i = 0; i < data.length; i++){
          if(data[i].login_status){
            position = data[i].position
            break
          }
        }
        callback6(null, position)
      }
    })
  }
  
  static show(callback7){
    this.readFile((err,data) =>{
      if(err) callback4(err,null)
      else{
          const result = []
          for(let i = 0; i < data.length; i++){
            let temp = new Employee(data[i].name, data[i].position, data[i].username, data[i].password)
            result.push(temp)
          }
          callback7(null, result)
      }
  })
  }
}

module.exports = ModelEmployee