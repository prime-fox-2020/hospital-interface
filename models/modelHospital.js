const fs = require('fs');

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
}

class Employee {
  constructor(name, position, username, password) {
    this.name = name;
    this.position = position;
    this.username = username;
    this.password = password;
  }
}

class ModelHospital {
  static choosePath(status) {
    let path = '';
    switch(status) {
      case 'employee': path = './datas/employees.json'; break;
      case 'patient': path = './datas/patients.json'; break;
    }
    return path;
  }

  static findAll(status, callback) {
    const path = this.choosePath(status);
    fs.readFile(path, 'utf8', (err, data) => {
      const dataParse = JSON.parse(data);
      callback(err, dataParse);
    });
  }

  static createAll(status, data, callback){
    const path = this.choosePath(status);
    data = JSON.stringify(data, null, 2);
    fs.writeFile(path, data, (err) => {
      callback(err);
    });
  }

  static createOneEmployee(name, position, username, password) {
    return new Employee(name, position, username, password);
  }

  static createOnePatient(id, name, diagnosis) {
    return new Patient(id, name, diagnosis);
  }
}

module.exports = ModelHospital;