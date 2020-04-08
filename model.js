'use strict';

const fs = require('fs');
const loged = fs.readFileSync('./loged.txt', 'utf8').split(',');

class Model {
  //login
  static login(params, callback) {
    if (loged.length !== 1) callback(`User ${loged[1]} still logged in. You need to logout first`, null);
    else if (params.length > 2) callback('Wrong login input --> login <username> <password>', null);
    else Employee.loginEmployee(params, (err, message) => err ? callback(err, null) : callback(null, message));
  }
  //logout
  static logout(callback) {
    if (loged.length == 1) callback(`Belum ada user yang login. Silahkan login`, null);
    else {
      fs.writeFileSync('./loged.txt', '');
      callback(null, 'user has been successfully logout!');
    }
  }
  //Show Data
  static showData(params, callback) {
    if (params.length > 1 || params.length < 1 || (params[0] !== 'employee' && params[0] !== 'patient')) callback('Wrong data input --> list <data>', null);
    else if ((params[0] == 'employee' && loged[0] !== 'admin') || (params[0] == 'patient' && loged[0] !== 'dokter')) callback('Access denied!!', null);
    else if (params[0] == 'employee' && loged[0] == 'admin') Employee.showEmployee((err, data) => callback(null, data));
    else if (params[0] == 'patient' && loged[0] == 'dokter') Patient.showPatient((err, data) => callback(null, data));
  }
  //Manage Data
  static manageData(params, callback) {
    if (params[0] == 'register') {
      if (params.length !== 4) callback('Wrong data input --> register <name> <position> <password>', null);
      else Employee.createEmployee(params, (err, message) => callback(null, message));
    }
    else {
      if (loged[0] !== 'dokter') callback('Tidak memiliki akses untuk add patient', null);
      else if (params.length < 3) callback('Wrong data input --> addPatient <name> <diagnosa>', null);
      else Patient.createPatient(params, (err, message) => callback(null, message));
    }
  }
}

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static showPatient(callback) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      if (!err) {
        let arr = [];
        let dataConvert = JSON.parse(data);
        for (let i in dataConvert) {
          arr.push(new Patient(dataConvert[i].id, dataConvert[i].name, dataConvert[i].diagnosis));
        }
        callback(null, arr);
      }
    });
  }

  static createPatient(params, callback) {
    fs.readFile('./patient.json', 'utf8', (err, data) => {
      if (!err) {
        let dataConvert = JSON.parse(data);
        let diagnosa = params[2];
        for (let i = 3; i < params.length; i++){
          diagnosa += ` ${params[i]}`;
        }
        let id = 1;
        dataConvert.length == 0 ? id = 1 : id = dataConvert[dataConvert.length - 1].id + 1;
        dataConvert.push(new Patient(id, params[1], diagnosa));
        fs.writeFile('./patient.json', JSON.stringify(dataConvert, null, 4), (err) => err);
        callback(null, `Data pasien berhasil ditambahkan. Total pasien : ${dataConvert.length}`);
      }
    });
  }
}

class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static showEmployee(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (!err) {
        let arr = [];
        let dataConvert = JSON.parse(data);
        for (let i in dataConvert) {
          arr.push(new Employee(dataConvert[i].id, dataConvert[i].name, dataConvert[i].position,
            dataConvert[i].username, dataConvert[i].password));
        }
        callback(null, arr);
      }
    });
  }

  static createEmployee(params, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (!err) {
        let dataConvert = JSON.parse(data);
        dataConvert.push(new Employee(dataConvert[dataConvert.length - 1].id + 1, params[1], params[3], params[1], params[2]));
        fs.writeFile('./employee.json', JSON.stringify(dataConvert, null, 4), (err) => err);
        callback(null, `Save data success {\"username\":\"${params[1]}\",\"password\":\"${params[2]}\",\"role\":\"${params[3]}\"}. Total employee : ${dataConvert.length}`);
      }
    });
  }

  static loginEmployee(params, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (!err) {
        let dataConvert = JSON.parse(data), cond = false, user = '';
        for (let i in dataConvert){
          if (dataConvert[i].username == params[0] && dataConvert[i].password == params[1]) {
            cond = true;
            user = `${dataConvert[i].position},${dataConvert[i].name}`;
            fs.writeFileSync('./loged.txt', user);
            break;
          }
        }
        if (cond == true) callback(null, `User ${params[0]} logged in successfully`);
        else callback(`Username / password Wrong`, null);
      }
    });
  }
}

module.exports = Model;