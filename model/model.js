const fs = require("fs")
const Controller = require("../controller")
const Employee = require("./Employee")
const Patient = require("./Patient")

class Model {
  static register(name, userName, password, position, callback1) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        callback1(err, null)
      } else {
        let data1 = JSON.parse(data)
        let newArr = []
        if (position !== "patient") {
          data1.push(new Employee(data1.length + 1, name, position, userName, password))
          newArr.push([userName, password, position, data1.length])
          let stringi = JSON.stringify(data1, null, 3)
          fs.writeFile('./employee.json', stringi, (err) => {
            if (err) {
              callback1(err, null)
            };
          })
          callback1(null, newArr)
        }
      }
    })
  }
  static login(userName, password, callback2) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        callback2(err, null)
      } else {
        let data1 = JSON.parse(data)
        let check = false
        for (let i = 0; i < data1.length; i++) {
          if (data1[i].username == userName && data1[i].password == password) {
            fs.readFile("./loggedIn.json", "utf8", (err, dataLog) => {
              let data2 = JSON.parse(dataLog)
              if (err) {
                callback2(err, null)
              } else if (data2.length > 0) {
                callback2(null, data2[0].name)
              } else if (data2.length == 0) {
                data2 = [{ name: data1[i].username, position: data1[i].position }]
                let stringi = JSON.stringify(data2, null, 3)
                fs.writeFile('./loggedIn.json', stringi, (err) => {
                  if (err) throw err;
                })
                callback2(null, userName)
              }
            })
            check = true
          }
        }
        if (!check) {
          callback2(null, false)
        }
      }
    })
  }
  static addPatient(id, name, penyakit, callback3) {
    fs.readFile("./loggedIn.json", "utf8", (err, dataLog) => {
      if (err) {
        callback2(err, null)
      } else {
        let data2 = JSON.parse(dataLog)
        if (data2[0].position == "dokter") {
          fs.readFile("./patient.json", "utf8", (err, data) => {
            if (err) {
              callback3(err, null)
            } else {
              let data1 = JSON.parse(data)
              data1.push(new Patient(data1.length + 1, name, penyakit))
              // console.log(data1)
              let jumlah = data1.length
              let stringi = JSON.stringify(data1, null, 3)
              fs.writeFile('./patient.json', stringi, (err) => {
                if (err) throw err;
              })
              callback3(null, jumlah)
            }
          })
        } else {
          callback3(null, false)
        }
      }
    })
  }
  static logout(callback4) {
    fs.readFile("./loggedIn.json", "utf8", (err, dataLog) => {
      if (err) {
        callback4(err, null)
      } else {
        let dataLoggedIn = JSON.parse(dataLog)
        if (dataLoggedIn.length > 0) {
          dataLoggedIn = []
          let stringi = JSON.stringify(dataLoggedIn, null, 3)
          fs.writeFile('./loggedIn.json', stringi, (err) => {
            if (err) throw err;
          })
          callback4(null, true)
        }
      }
    })
  }
}

module.exports = Model