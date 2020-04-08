const Dokter = require('./dokter');
const Other = require('./other');
const Patient = require('./patient');
const fs = require('fs');

class Model {
  static read(path, callback1) {
    fs.readFile(path, null, (err, data) => {
      if (err)
        callback1(err, null);
      else {
        let parse = JSON.parse(data);
        callback1(null, parse);
      }
    })
  }

  static register(params, callback2) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        callback2(err, null);
      } else {
        let id;
        if (data.length == 0) {
          id = 1;
        } else {
          id = data[data.length - 1].id + 1;
        }

        let employee;
        switch (params[3]) {
          case 'dokter':
            employee = new Dokter(id, params[0], params[1], params[2]);
            data.push(employee);
            fs.writeFile('./data/employees.json', JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback2(err, null);
              } else {
                callback2(null, `save data success ${JSON.stringify(employee)}.\nTotal employee : ${data.length}`);
              }
            })
            break;
          default:
            employee = new Other(id, params[0], params[1], params[2]);
            data.push(employee);
            fs.writeFile('./data/employees.json', JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback2(err, null);
              } else {
                callback2(null, `save data success ${JSON.stringify(employee)}.\nTotal employee : ${data.length}`);
              }
            })
            break;
        }

      }
    })
  }

  static login(params, callback3) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        callback3(err, null);
      } else {
        let checkLogin = false;
        data.forEach(list => {
          if (list.loginStatus == true) {
            checkLogin = true;
          }
        });

        if (!checkLogin) {
          let checkPassword = false;
          data.forEach(list => {
            if (list.username == params[0] && list.password == params[1]) {
              list.loginStatus = true;
              checkPassword = true;
              fs.writeFile('./data/employees.json', JSON.stringify(data, null, 2), (err) => {
                if (err) {
                  callback3(err, null);
                } else {
                  callback3(null, `user ${list.username} logged in successfully`);
                }
              })
            }
          });

          if (!checkPassword) {
            fs.writeFile('./data/employees.json', JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback3(err, null);
              } else {
                callback3(null, `sorry 'username / password' is wrong`);
              }
            })
          }
        } else {
          callback3(null, `user ${data.username} need logout first.`);
        }
      }
    })
  }

  static logout(callback4) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        callback4(err, null);
      } else {
        let checkLogout = false;
        data.forEach(list => {
          if (list.loginStatus == true) {
            list.loginStatus = false;
            checkLogout = true;
            fs.writeFile('./data/employees.json', JSON.stringify(data, null, 2), (err) => {
              if (err) {
                callback4(err, null);
              } else {
                callback4(null, `user ${list.username} has been successfully logout!`);
              }
            })
          }
        });

        if (!checkLogout) {
          callback4(null, 'No One Login');
        }
      }
    })
  }

  static addPatient(params, callback5) {
    this.read('./data/employees.json', (err, data) => {
      if (err) {
        callback5(err, null);
      } else {
        let checkLogin, checkDokter = false;
        data.forEach(list => {
          if (list.loginStatus == true) {
            checkLogin = true;
            if (list.position == 'dokter') {
              checkDokter = true;
              this.read('./data/patients.json', (err, data) => {
                if (err) {
                  callback5(err, null);
                } else {
                  let id;
                  if (data.length == 0) {
                    id = 1;
                  } else {
                    id = data[data.length - 1].id + 1;
                  }
                  let patient = new Patient(id, params[0], params.slice(1));
                  data.push(patient);
                  fs.writeFile('./data/patients.json', JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                      callback5(err, null);
                    } else {
                      callback5(null, `data pasien berhasil ditambahkan. Total data pasien : ${data.length}`)
                    }
                  })
                }
              })
            } 
          }
        });
        if (!checkLogin) {
          callback5(null, `Login terlebih dahulu`);
        } else if (!checkDokter) {
          callback5(null, `tidak memiliki askes untuk add patient`);
        }
      }
    })
  }
}

module.exports = Model;