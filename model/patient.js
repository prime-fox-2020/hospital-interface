let fs = require('fs')


class Patient {
    constructor(id, name, diagnosis) {
      this.id = id
      this.name = name
      this.diagnosis = diagnosis
    }

    static listpatient(callback){
      fs.readFile('./data/patient.json','utf8',(err,data) => {
        if(err) {
          callback(err,null)
        } else {
          let patients = [];
          let dataparse = JSON.parse(data)
          
          for(var i = 0 ; i < dataparse.length ; i++){
            patients.push(new Patient(dataparse[i].id,dataparse[i].name,
              dataparse[i].diagnosis))
          }
          callback(null, patients)
        }
      })
    }
    



  
    static register(name,diagnosis,cb){
      fs.readFile('./login.json','utf8',(err,data) => {
        if(err) {
          cb(err,null)
        } else {
          let dataloginparse = JSON.parse(data)
          let check = false 
          for(var i = 0 ; i <dataloginparse.length ; i ++){
            if(dataloginparse[i].position=='Doctor'){
              check = true
            }
          }

          if (check == true){
            this.listpatient((err,data)=>{
              if(err){
                cb(err,null)
              }else{
                // cb(null,data)
                let newpatient = data
                let newid = Number(data[data.length-1].id)+1

                newpatient.push(new Patient(newid,name,diagnosis))

                fs.writeFile('./data/patient.json',JSON.stringify(newpatient,null,4), (err,data)=>{
                  if(err){
                    cb(err,null)
                  } else{
                    cb(null,newpatient)
                  }
                })
              }
            })



          }else{
            cb(err,null)
          }
          
          





        }
      })
    }
  

  
  
  
  
  
  
  
  
  
  }




module.exports = Patient