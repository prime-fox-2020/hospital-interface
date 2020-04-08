const fs =require(`fs`);

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static addPatient(params,callback){
    fs.readFile(`./patient.json`,'utf-8', (err,data)=>{
      if(err){
        callback(err,null)
      }else{
        const dataParse = JSON.parse(data)
        
        dataParse.push({
          id: Number(params[0]),
          nama: params[1],
          diagnosis: params.slice(2).join(' ')
        })
        
        const dataStringfy = JSON.stringify(dataParse,null,2)
        fs.writeFile(`./patient.json`,dataStringfy,(err)=>{
          if(err){
            callback(err,null)
          }else{
            callback(null,`data pasien berhasil ditambahkan. Total data pasien : ${dataParse.length}`)
          }
        })
      }
    })
  }

}




module.exports = Patient