const fs = require('fs')

class View {
  static help (commandList){
    for (let i = 0; i < commandList.length; i++){
      console.log(`node index.js ` + commandList[i])
    }
  }

  static login (username, password){
    let raw = fs.readFileSync('./employee.json','utf8')
    let data = JSON.parse(raw)
    for (let i = 0; i < data.length; i++){
      if (username == data[i].username && password == data[i].password && data[i].login == false){
        console.log(`User ${data[i].name} logged in successfully`)
        data[i].login = true
      } else if (username == data[i].username && password == data[i].password && data[i].login == true){
        console.log(`You have not logged out`)
      } else if (username == data[i].username && password != data[i].password && data[i].login == false){
        console.log(`Username/password wrong`)
      } else if (username != data[i].username && password == data[i].password && data[i].login == false){
        console.log(`Username/password wrong`)
      }
    }  
    let newData = JSON.stringify(data, null, 4)
    fs.writeFileSync('./employee.json',newData)
  }

  static logout (){
    let raw = fs.readFileSync('./employee.json','utf8')
    let data = JSON.parse(raw)
    for (let i = 0; i < data.length; i++){
      if (data[i].login == true){
        data[i].login = false
        console.log(`You have logged out`)
      }
    }
    let newData = JSON.stringify(data, null, 4)
    fs.writeFileSync('./employee.json',newData)
  }
}

module.exports = View