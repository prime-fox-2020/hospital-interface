/*
register -> readFile -> add new File -> write File 
login -> readFile -> cocok / tidak id pass -> benar/salah 
*/
const fs = require('fs')
let Employee = require('./employee.js')
let Patient = require('./patient.js')

class Model {
  static register(param, callback) {
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback(err, null)
      } else {
        const dataObj = JSON.parse(data)
        // console.log(dataObj)
        //jadikan array of instance 
        const arrData = []
        for (var i = 0; i < dataObj.length; i++) {
          arrData.push(new Employee(dataObj[i].name, dataObj[i].position, dataObj[i].username, dataObj[i].password))
        }
        // console.log(arrData)
        //add new position 
        let newEmployee = new Employee(param[0], param[1], param[2], param[3])
        arrData.push(newEmployee)

        // console.log(arrData)
        // callback(null,arrData.length)
        //write data 
        const String = JSON.stringify(arrData, null, 2)
        fs.writeFile('./data/employee.json', String, (err) => {
          if (err) {
            callback(err, null)
          } else {
            callback(null, `Number of Employee : ${arrData.length}`)
          }
        })
      }
    })
  }
  static login(param, callback2) {
    //baca file employee
    fs.readFile('./data/employee.json', 'utf8', (err, data) => {
      if (err) {
        callback2(err, null)
      } else {
        const dataObj = JSON.parse(data)
        const arrData = []
        for (var i = 0; i < dataObj.length; i++) {
          arrData.push(new Employee(dataObj[i].name, dataObj[i].position, dataObj[i].username, dataObj[i].password))
        }
        //baca file login
        fs.readFile('./data/login.json', 'utf8', (err, data) => {
          if (err) {
            callback2(err, null)
          } else {
            const dataLogin = JSON.parse(data) // mengambil data login saat ini 
            // console.log(`ini data sebelum login \n`,dataLogin)
            let loginStatus = ''
            if (dataLogin[0].name == "") {
              for (var i = 0; i < arrData.length; i++) {
                if (param[0] == arrData[i].username && param[1] == arrData[i].password) {
                  dataLogin[0] = arrData[i]
                  loginStatus = `Welcome User ${arrData[i].name}, You have succesfully logged in !`
                } else if (param[0] == arrData[i].username && param[1] !== arrData[i].password) {
                  loginStatus = `You have entered the wrong password !`
                }
              }
            } else {
              loginStatus = `${dataLogin[0].name} is currently logged in ! Log out first!`
            }
            // console.log(`ini data setelah login \n `, dataLogin, loginStatus)
            //write data login 
            const loginString = JSON.stringify(dataLogin, null, 2)
            // console.log(`ini data yang mau di tulis \n`,loginString)
            fs.writeFile('./data/login.json', loginString, (err) => {
              if (err) {
                callback2(err, null)
              } else {
                callback2(null, loginStatus)
              }
            })
          }
        })
      }
    })
  }
  static addPatient(param, callback3) {
    //baca file login > siapa yg sedang login 
    fs.readFile('./data/login.json', 'utf8', (err, data) => {
      if (err) {
        callback3(err, null)
      } else {
        const dataLogin = JSON.parse(data)
        let addPatientInfo = ''
        // console.log(dataLogin) 
        //jika yang login bukan dokter 
        if (dataLogin[0].position !== 'dokter') {
          addPatientInfo = 'Only doctors are allowed to add Patient information!'
        } else if (dataLogin[0].position == 'dokter') {
          //baca file patient 
          fs.readFile('./data/patient.json', 'utf8', (err, data) => {
            if (err) {
              callback3(err, null)
            } else {
              const arrPatient = JSON.parse(data)
              // console.log(`ini arrPatient Lama!`,arrPatient)
              // add more patient 
              const diagnose = param.slice(2)
              // console.log(diagnose)
              let newId = arrPatient[arrPatient.length - 1].id + 1
              arrPatient.push(new Patient(newId, param[0], diagnose))
              // console.log(`ini arrPatient Baru!`,arrPatient)
              const stringPatient = JSON.stringify(arrPatient, null, 2)
              addPatientInfo = `Patient's data succesfully added. Total Patient Data : ${arrPatient.length}`
              fs.writeFile('./data/patient.json', stringPatient, (err) => {
                if (err) {
                  callback3(err, null)
                } else {
                  callback3(null, addPatientInfo)
                }
              })

            }
          })
        }
      }
    })
  }

  static logout(callback4) {
    //baca file login utk tau siapa yg lg login
    fs.readFile('./data/login.json', 'utf8', (err, data) => {
      if (err) {
        callback4(err, null)
      } else {
        const dataLogin = JSON.parse(data)
        // console.log(dataLogin)
        let statusLogin = ''
        // console.log(dataLogin[0].name)
        //kondisi jika tidak ada yg login 
        if (dataLogin[0].name == "") {
          statusLogin = `No one is currently logged in !`
        } else {
          dataLogin[0].name = ""
          dataLogin[0].position = ""
          dataLogin[0].username = ""
          dataLogin[0].password = ""
          statusLogin = `You have successfully logged out!`
          // console.log(dataLogin)
          //write file 
        }
        let stringData = JSON.stringify(dataLogin, null, 2)
        fs.writeFile('./data/login.json', stringData, (err) => {
          if (err) {
            callback4(err, null)
          } else {
            callback4(null, statusLogin)
          }
        })
      }
    })
  }
}

module.exports = Model
