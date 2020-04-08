const fs = require('fs')
const EmployeeModel = require('./employeeModel')

class PatientModel {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static readDataPatientFromJSON(callback1){
        fs.readFile('./data/patient.json','utf-8',(err,data) =>{
            if (err){
                callback1(err,null)
            } else {
                const patientDataParse = JSON.parse(data)
                callback1(null,patientDataParse)
            }
        })
    }

    static writeDataPatientToJSON(patientDataParse,callback2){
        const patientDataStringify = JSON.stringify(patientDataParse,null,2)
        fs.writeFile('./data/patient.json',patientDataStringify, (err) =>{
            if (err){
                callback2(err,null)
            } else {
                callback2(null, `Data pasien berhasil ditambahkan. Total pasien : ${patientDataParse.length}`)
            }
        })
    }

    static registerPatient(param, cb1){
        EmployeeModel.readDataEmployeeFromJSON((err,employeeDataParse) =>{
            if (err){
                cb1(err,null)
            } else {
                let flag = false
                for (let i = 0; i<employeeDataParse.length; i++){
                    if (employeeDataParse[i].position == 'dokter' && employeeDataParse[i].logged_in == true){
                        flag = true
                    }
                }
                if(!flag){
                    cb1(`Tidak memiliki akses untuk add pasien`,null)
                } else {
                    PatientModel.readDataPatientFromJSON((err, patientDataParse) => {
                        let newID = 0
                        if (patientDataParse.length === 0){
                            newID = 1
                        } else {
                            newID = patientDataParse[patientDataParse.length - 1].id + 1
                        }
                        let obj = {}
                        obj.id = newID
                        obj.name = param[0]
                        obj.diagnosis = param.slice(1)
                        patientDataParse.push(obj)

                        PatientModel.writeDataPatientToJSON(patientDataParse,cb1)
                    })
                }
            }
        })
    }
    static viewAllPatient(cb2){
        EmployeeModel.readDataEmployeeFromJSON((err,employeeDataParse) => {
            if (err){
              cb4(err,null)
            } else {
              let countLogin = false
              for (let i = 0; i<employeeDataParse.length; i++){
                if (employeeDataParse[i].logged_in === true){
                  countLogin = true
                }
              }
              if (!countLogin){
                cb2(`No one is currently login. Please Log-in first`,null)
              } else {
                  PatientModel.readDataPatientFromJSON((err,patientDataParse) =>{
                    if (err){
                        cb2(err,null)
                    } else {
                        let patientDataConvert = []
                        for (let i = 0; i<patientDataParse.length; i++){
                            patientDataConvert.push(new PatientModel(patientDataParse[i].id, patientDataParse[i].name, patientDataParse[i].diagnosis))
                        }
                        cb2(null, patientDataConvert)
                    }
                  })
                }
            }
        })
    }
}

module.exports = PatientModel