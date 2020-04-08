const fs = require('fs')

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}


class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
    this.status = 'offline'
  }
}


class Model {
  static addPatient (param, callback) {
    Model.readFilePatients((err, data) => {
      if (err) {
        callback(err, null);
      }
      else {
        let id;
        if (data.length == 0) {
          id = 1;
        }
        else {
          id = Number(data[data.length-1].id + 1)
        }
        Model.readFileEmployee((err, data) => {
          if (err) {
            callback(err, null);
          }
          else {
            let check = false;
            for (let i = 0; i < data.length; i++) {
              
              if (data[i].position == 'Dokter' && data[i].status == 'online') {
                Model.readFilePatients((err, data) => {
                  if (err) {
                    callback(err, null);
                  }
                  else {
                    check = true;
                    data.push(new Patient(id, param[0], param[1]));
                    Model.writeFilePatients(data, (err, message) => {
                      if (err) {
                        callback(err, null);
                      }
                      else {
                        callback(null, message)
                      }
                    })
                    if (!check) {
                      let message = 'Anda tidak memiliki akses untuk menambahkan pasien.'
                      callback(null, message)
                    }
                  }
                })
              }
            }
            
          }
        })
      }
    })
  }
  static addEmployee (param, callback) {
    Model.readFileEmployee((err, data) => {
      if (err) {
        callback(err, null);
      }
      else {
        let id;
        if (data.length == 0) {
          id = 1;
        }
        else {
          id = Number(data[data.length-1].id + 1)
        }
        data.push(new Employee(id, param[0], param[1], param[2], param[3]));
        Model.writeFileEmployee(data, (err, message) => {
          if (err) {
            callback(err, null);
          }
          else {
            callback(null, message)
          }
        })
      }
    })
  }

  static employeeLogin (param, callback) {
    Model.readFileEmployee((err, data) => {
      if (err) {
        callback(err, null);
      }
      else {
        let check = false;
        let employeeCount = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].status == 'online') {
            employeeCount++;
          }
          if (data[i].username == param[0] && data[i].password == param[1] && data[i].status == 'offline') {
            data[i].status = 'online';
            employeeCount++;
            check = true;
            Model.writeFileEmployee(data, (err, message) => {
              if (err) {
                callback(err, null);
              }
              else {
                message = `Selamat datang, ${data[i].posisi} ${data[i].name}. Anda sudah berhasil login.\nTotal employee : ${employeeCount}`
                callback(null, message)
              }
            })
          }
          else if (data[i].username == param[0] && data[i].password == param[1] && data[i].status == 'online') {
            callback(null, 'Anda sudah login. Silahkan logout untuk login kembali')
            check = true;
          }
        }
        if (!check) {
          callback(null, 'Maaf, data yang anda masukkan salah.')
        }
      }
    })
  }

  static writeFileEmployee (parsedData, callback) {
    fs.writeFile('./employee.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
      }
      else {
        callback(null, 'Employee succesfully added.')
      }
    })
  }

  static readFileEmployee (callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if(err) {
        callback(err, null);
      }
      else {
        data = JSON.parse(data);
        callback(null, data);
      }
    })
  }

  static writeFilePatients (parsedData, callback) {
    fs.writeFile('./patients.json', JSON.stringify(parsedData, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err.message);
      }
      else {
        callback(null, 'Patients succesfully added.')
      }
    })
  }

  static readFilePatients (callback) {
    fs.readFile('./patients.json', 'utf8', (err, data) => {
      if(err) {
        callback(err, null);
      }
      else {
        data = JSON.parse(data);
        callback(null, data);
      }
    })
  }
}


module.exports = Model;