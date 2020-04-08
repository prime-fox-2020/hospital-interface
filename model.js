const fs = require('fs');

class Patient {
  constructor(objPatient) { }

  static add(objPatient, callback) {
    Patient.checkDokter((status) => {
      if (status === false) {
        callback(false, objPatient);
      } else {
        fs.readFile('patient.json', 'utf8', (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let fetchPatient = JSON.parse(data);
            fetchPatient.push(objPatient);
            let finalData = JSON.stringify(fetchPatient, null, 2);
            fs.writeFile('patient.json', finalData, 'utf8', (err, data) => { });
            callback(true, fetchPatient);
          }
        })
      }
    })
  }

  static checkDokter(callback) {
    fs.readFile('login.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let fetchLogin = JSON.parse(data);
        if (fetchLogin['role'] === 'dokter') {
          callback(true);
          return;
        } else {
          callback(false);
        }
      }
    })
  }

} //end patient

class Employee {
  constructor(objData) { }

  static register(objData, callback) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let fetchData = JSON.parse(data);
        fetchData.push(objData);
        let finalData = JSON.stringify(fetchData, null, 2);
        fs.writeFile('employee.json', finalData, 'utf8', (err, data) => { });
        callback(objData, fetchData);
      }
    })
  } //end register

  static login(objLogin, callback) {
    fs.readFile('employee.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let fetchData = JSON.parse(data);
        for (var i = 0; i < fetchData.length; i++) {
          if (objLogin['username'] === fetchData[i]['username'] && objLogin['password'] === fetchData[i]['password']) {
            fs.writeFile('login.json', JSON.stringify(fetchData[i]), 'utf8', (err, data) => { });
            callback(true, objLogin);
            return;
          }
        }
        callback(false, objLogin);
      }
    })
  } //end login

} // end class employee

module.exports = { Employee, Patient }