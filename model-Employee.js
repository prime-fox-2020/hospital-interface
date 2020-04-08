const fs =require(`fs`);

class Employee {
  constructor(name, position, username, password, login = false) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.login = login
  }

  static register(params,callback){

    fs.readFile(`./employee.json`,'utf-8', (err,data)=>{
      if(err){
        callback(err,null)
      }else{
        const dataParse = JSON.parse(data)
        
        dataParse.push({
        nama: params[0],
        position: params[3],
        username: params[1],
        password: params[2],
        login: false
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



}



module.exports = Employee