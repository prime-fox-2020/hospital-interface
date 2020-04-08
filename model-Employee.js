const fs =require(`fs`);

class Employee {
  constructor(name, position, username, password, login = false) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = login
    this.id = null
  }

  static register(params,callback){

    fs.readFile(`./employee.json`,'utf-8', (err,data)=>{
      if(err){
        callback(err,null)
      }else{

        
        const dataParse = JSON.parse(data)

        let newId = dataParse[dataParse.length-1].id +1
        dataParse.push({
        nama: params[0],
        position: params[3],
        username: params[1],
        password: params[2],
        login: false,
        id:newId
        })
        
        const dataStringfy = JSON.stringify(dataParse,null,2)
        fs.writeFile(`./employee.json`,dataStringfy,(err)=>{
          if(err){
            callback(err,null)
          }else{
            callback(null,`Save data success {"nama":"${params[0]}", "username":"${params[1]}", "password":"${params[2]}, "potition":"${params[3]}". Total employee : ${dataParse.length} }`)
          }
        })
      }
    })
  }

  static login(params,callback){
    
    fs.readFile(`./employee.json`,'utf-8', (err,data)=>{
      if(err){
        callback(err,null)
      }else{

        const dataParse = JSON.parse(data)
        let cek = false
        
        for (let i = 0; i < dataParse.length; i++) {
          if(params[0] == dataParse[i].username && params[1] == dataParse[i].password){
            dataParse[i].login = true
            cek = true
          }
        }
        if(cek == false){
          callback(null,`Username / Password wrong`)
        }else{
          const dataStringfy = JSON.stringify(dataParse,null,2)
          fs.writeFile(`./employee.json`,dataStringfy,(err)=>{
            if(err){
              callback(err,null)
            }else{
              callback(null,`user ${params[0]} logged is successfully`)
            }
          })
        }
      }
    })
  }

  static cekLogin(callback){

    fs.readFile(`./employee.json`,'utf-8', (err,data)=>{
      if(err){
        callback(err,null)
      }else{

        const dataParse = JSON.parse(data)
        let cek = false
        for (let i = 0; i < dataParse.length; i++) {
          if(dataParse[i].login == true && dataParse[i].position ==`dokter`){
            callback(null,true)
            cek = true
            break;
          }
        }
        if(!cek){
          callback(null,false)
        }
      }
    })
  }



}



module.exports = Employee