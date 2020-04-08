const fs = require('fs')

// class Patient {
//   constructor(id, name, diagnosis) {
//     this.id = id
//     this.name = name
//     this.diagnosis = diagnosis
//   }
// }

class Employee {
  constructor(username, password, position) {
    this.username = username
    this.password = password
    this.position = position
  }

  static register(objData, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) {
        console.log('erooorrr');
      }
      else {
        let fetchData = JSON.parse(data)
        fetchData.push(objData)

        let finalData = JSON.stringify(fetchData, null, 2)
        fs.writeFile('./employee.json', finalData, 'utf8', (err, data) => { })
        callback(objData, fetchData)
      }
    })
  }
}

module.exports = Employee 