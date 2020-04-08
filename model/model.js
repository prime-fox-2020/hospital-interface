const fs = require('fs')
const Employee = require('./employee')
const Patient = require('./patient')


class Model {

  static save(data, callback){
    const datastringify = JSON.stringify(data, null, 2)
    fs.writeFile('./employee.json', datastringify, (err)=>{
      if (err){
        callback(err, null)
      } else {
        callback(null, true)
      }
    })
  }

  static savePatient(data, callback){
    const datastringify = JSON.stringify(data, null, 2)
    fs.writeFile('./patient.json', datastringify, (err)=>{
      if (err){
        callback(err, null)
      } else {
        callback(null, true)
      }
    })
  }

  static findAll(callback1) {
    fs.readFile('./employee.json', 'utf8', (err, data)=>{
      if (err){
        callback1(err, null)
      } else {
        const dataParse = JSON.parse(data)
        const dataConvert = []
        for (let i = 0; i < dataParse.length; i++) {
          dataConvert.push(new Employee(
            dataParse[i].id,
            dataParse[i].name,
            dataParse[i].username,
            dataParse[i].password,
            dataParse[i].position,
            dataParse[i].status
          ))
        }
        callback1(null, dataConvert)
      }
    })
  }

  static findPatient(callback5) {
    fs.readFile('./patient.json', 'utf8', (err, data)=>{
      if (err){
        callback5(err, null)
      } else {
        const dataParse = JSON.parse(data)
        const dataConvert = []
        for (let i = 0; i < dataParse.length; i++) {
          dataConvert.push(new Patient(
            dataParse[i].id,
            dataParse[i].name,
            dataParse[i].diagnosis
          ))
        }
        callback5(null, dataConvert)
      }
    })
  }

  static createOne(params, callback2) {
    this.findAll((err,data)=>{
      if (err){
        callback2(err, null)
      } else {
        const newId = data[data.length-1].id +1
        data.push({
          id : newId,
          name: params[0],
          username: params[1],
          password: params[2],
          position: params[3],
          status: false
        })
        this.save(data, (err)=>{
          if (err){
            callback2(err, null)
          } else {
            callback2(null, `save data success {"username": "${params[1]}", "password": "${params[2]}" ,"role": "${params[3]}"}. Total employee : ${data.length}`)
          }
        })
      }
    })
  }

  static login(params, callback3) {
    this.findAll((err, data) =>{
      if (err){
        callback3(err, null)
      } else {
        let user = params[0]
        let pass = params[1]
        let msg = ''
        let name = ''
        let check = false

        for (let i = 0; i < data.length; i++) {
          if(data[i].status){
            name = data[i].name
            check = true
          }
        }
        if(check){
          callback3(null, `user ${name} masih login`)
        } else {
          for (let j = 0; j < data.length; j++) {
            if(data[j].username === user && data[j].password === pass){
              data[j].status = true
              msg = `user ${user} logged in successfully!!`
              break
            } else {
              msg = `username / password wrong!!`
            }
          }
          this.save(data, (err)=>{
            if (err){
              callback3(err, null)
            } else {
              callback3(null, msg)
            }
          })
        }
      }
    })
  }

  static createPatient(params, callback4){
    let msg;
    
    this.findAll((err, data)=>{
      if (err){
        callback4(err, null)
      } else {
        let check = false
        for (let i = 0; i < data.length; i++) {
          if(data[i].status === true && data[i].position === 'dokter'){
            check = true
          }
        }
        if(check){
          this.findPatient((err, data)=>{
            if (err){
              callback4(err, null)
            } else {
              const newId = data[data.length-1].id+1
              data.push({
                id : newId,
                name: params[0],
                diagnosis: params.slice(1)
              })
              this.savePatient(data, (err)=>{
                if (err){
                  callback4(err, null)
                } else {
                  callback4(null, `data pasien berhasil ditambahkan. total data pasien ${data.length}`)
                }
              })
            }
          })
        } else {
          callback4(null, `tidak memiliki akses untuk add patient`)
        }
      }
    })
  }

  static logout(callback6) {
    this.findAll((err, data) =>{
      if (err){
        callback6(err, null)
      } else {
        for (let i = 0; i < data.length; i++) {
          if(data[i].status == true){
            data[i].status = false
          }
        }
        this.save(data, (err)=>{
          if (err){
            callback6(err, null)
          } else {
            callback6(null, `user has been successfully logout!`)
          }
        })
      }
    })
  }
}





module.exports = Model