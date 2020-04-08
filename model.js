const fs = require('fs');
const Employee = require('./employee_model');
const Patient = require('./patient_model');

class Model {
  static createData(params, callback) {
    let newData = new Employee(params[0], params[3], params[1], params[2]);
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) throw err;
      else {
        data = JSON.parse(data);
        
        let id;
        if (!data.length) {
          id = 1;
        } else {
          id = data[data.length-1].id + 1;
        }
        newData.id = id;
        let check = data.filter(da => da.username == newData.username);
        if (check.length) {
          callback(true, newData.username);
        } else {
          data.push(newData);
          fs.writeFile('./employee.json', JSON.stringify(data), () => null);
          callback(null, newData, data.length);
        }
      }
    })
  }

  static login(user, callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) throw err;
      else {
        data = JSON.parse(data);
        let isLogin = data.filter(da => da.is_login);
        
        let flag = true;// wrong username/password or already logged in
        for (let i = 0; i < data.length; i++) {
          if (data[i].username == user[0] && data[i].password == user[1] && !isLogin.length) {
            data[i].is_login = true;
            fs.writeFile('./employee.json', JSON.stringify(data), () => null);
            callback(data[i].username);
            flag = false;
          }
        }
        if (flag) {
          callback(null, isLogin[0]);
        }
      }
    })
  }

  static addPatient(params, callback) {
    let patient = new Patient(params[0], params[1], params.slice(2));
    fs.readFile('./employee.json', 'utf8', (er, dat) => {
      if (er) {
        throw er;
      } else {
        let dokter = JSON.parse(dat).filter(d => d.position == 'dokter' && d.is_login);
        if (dokter.length) {
          fs.readFile('./patient.json', 'utf8', (err, data) => {
            if (err) throw err;
            else {
              data = JSON.parse(data);

              let id;
              if (!data.length) {
                id = 1;
              } else {
                id = data[data.length-1].id + 1;
              }
              patient.id = id;
              data.push(patient);
              fs.writeFile('./patient.json', JSON.stringify(data), ()=>null);
              callback(data.length);
            }
          })
        } else {
          callback();
        }
      }
    })
  }

  static logout(callback) {
    fs.readFile('./employee.json', 'utf8', (err, data) => {
      if (err) throw err;
      else {
        data = JSON.parse(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].is_login) {
            data[i].is_login = false;
          }
        }
        fs.writeFile('./employee.json', JSON.stringify(data), ()=>null);
        callback();
      }
    })
  }
}

module.exports = Model;