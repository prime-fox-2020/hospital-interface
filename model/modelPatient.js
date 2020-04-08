const fs = require('fs')
const {Patient} = require('./modelPatientEmployee')

class ModelPatient{

    static readFile(callback1){
        fs.readFile('./patient.json', 'utf8', (err,data) => {
          if(err) callback1(err, null)
          else{
            const dataParse = JSON.parse(data)
            callback1(null, dataParse)
          }
        })
    }
    static writeFile(data, type, callback2){        
        const dataString = JSON.stringify(data, null, 2)
        fs.writeFile('./patient.json', dataString, (err) => {
          if(err) callback2(err, null)
          else {
            if(type === 'add'){
                callback2(null, 'Data patient successfully added')
            }
            else if(type === 'delete'){
                callback2(null, 'Data patient successfully deleted')
            }
          }
        })
    }
    static addPatient(params, pos, callback3){
        if(pos === 'doctor'){
            this.readFile((err,data) =>{
                if(err) callback3(err, null)
                else{
                    let len = data.length
                    if(len > 0){
                        len = data[data.length-1].id
                    }
                    let temparr = params.slice(1)
                    const obj = {
                        "id": len+1,
                        "name": params[0],
                        "diagnosis" : temparr
                    }
                    data.push(obj)
                    this.writeFile(data, 'add', callback3)
                }
            })
        }
        else{
            callback3(null, 'no authority to add patient list')
        }
    }
    static showPatient(callback4){
        this.readFile((err,data) =>{
            if(err) callback4(err,null)
            else{
                const result = []
                for(let i = 0; i < data.length; i++){
                    let temp = new Patient(data[i].id, data[i].name, data[i].diagnosis.join(', '))
                    result.push(temp)
                }
                callback4(null, result)
            }
        })
    }
    static delete(param, callback5){
        this.readFile((err,data) => {
            if(err) callback5(err,null)
            else{
                const result = []
                for(let i = 0; i < data.length; i++){
                    if(data[i].id !== param){
                        result.push(data[i])
                    }
                }
                this.writeFile(result, 'delete', callback5)
            }
        })
    }
}

module.exports = ModelPatient