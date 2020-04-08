const Employee = require('./employee.js')
const Patient = require('./patient')
const fs = require('fs')
const path = require('path')

class Hospital {

    static showEmployee(callback) {
        fs.readFile('./employee.json', 'utf8', (err, data) => {
            if(err) {
                callback(err)
            } else {
                const parsData = JSON.parse(data)
  
                const dataConvert = []
  
                for(let i=0; i<parsData.length; i++) {
                    dataConvert.push(new Employee(
                      parsData[i].id,
                      parsData[i].name,
                      parsData[i].position,
                      parsData[i].username,
                      parsData[i].password))
                }
  
                callback(null, dataConvert)
            }
        })
    }

    static register(dataUser, callback) {
       fs.readFile('./employee.json', 'utf8', (err, data) => {
            if(err) {
                callback(err)
            } else {
                const parsData = JSON.parse(data)
                const newId = parsData[parsData.length-1].id+1
                parsData.push({
                    id: Number(newId),
                    name : dataUser[0],
                    position : dataUser[3],
                    username : dataUser[1],
                    password : dataUser[2],
                    isLogin : false
                })

                //console.log(data)

                fs.writeFile('./employee.json', JSON.stringify(parsData, null, 3), (err) => {
                    if(err) {
                        callback(err, null)
                    } else {
                        callback(null, dataUser)
                    }
                })


                return parsData
            }
       })
    }

    static login(datas, callback) {

        fs.readFile('./employee.json', (err, data) => {
            //console.log(data)
            if(err) {
                console.log(err)
                callback(err)
            } else {
                //console.log(__dirname)
                data.forEach(el => {
                    if(el.username === datas[0] && el.password === datas[1]) {
                        if(!el.isLogin) {
                            el.isLogin = true

                            fs.writeFile('./employee.json', JSON.stringify(data, null, 2), (err) => {
                                if(err) {
                                    callback(err)
                                } else {
                                    callback(null, true)
                                }
                            })
                        } else {
                            callback(null, 'sedang login')
                        }
                    }
                });
                callback(null, 'salah')
            }
        })
    }

    static addPatient(datas, callback) {
        fs.readFile('./patient.json', (err, data) => {
            if(err) {
                callback(err)
            } else {
                let parsData = JSON.parse(data)
                let patientPerson = datas[0]
                let patientName = datas[1]
                let diagnosis = datas.slice(2)

                fs.readFile('./patient.json', (err, data) => {
                    if(err) {
                        callback(err)
                    } else {
                        let dataEmployee = data
                        let cek = false

                        dataEmployee.forEach(el => {
                            if(el.isLogin) {
                                if(el.position === 'dokter') {
                                    cek = true

                                    for(let i=0; i<patientPerson; i++) {
                                        parsData.push({
                                            id:parsData[parsData.length-1].id +1,
                                            name : patientPerson,
                                            diagnosis :diagnosis
                                        })
                                    }

                                    fs.writeFile('./patient.json', JSON.stringify(dataEmployee, null, 2), (err) => {
                                        if(err) {
                                            callback(err)
                                        } else {
                                            callback(null, true)
                                        }
                                    })
                                }
                            }
                        })

                        if(cek) {
                            callback(null, true)
                        } else {
                            callback(null, 'you can not add patient')
                        }
                    }
                })
            }
        })
    }

    static logout(callback) {
      fs.readFile('./employee.json', 'utf8', (err, data) => {
          if(err) {
              callback(err)
          } else {

            const parsData = JSON.parse(data)
            let cek = false

            for(let i=0; i<parsData.length; i++) {
                if(parsData[i].isLogin === true) {
                    parsData[i].isLogin === false

                    fs.writeFile('./employee.json', JSON.stringify(parsData, null, 2), (err) => {
                        if(err) {
                            callback(err)
                        } else {
                            callback(null, 'success logout')
                        }
                    })

                    cek = true
                }
            }

            if(cek === false) {
                callback(null, 'can not logout')
            }
          }
      })
    }
 
}

module.exports = Hospital
