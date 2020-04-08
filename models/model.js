const Employee = require('./employee');
const Patient = require('./patient');
const fs = require('fs');


class Model{
    static read(cb){
        fs.readFile('./data/employee.json', 'utf-8', (err, data) => {
            if(err){
              cb(err, null)
            } else {
              data = JSON.parse(data);
              cb(null, data);
            }
        })
    }

    static listEmployee(cb){
      this.read((err, data) => {
        if(err){
          cb(err, null);
        } else {
          let instance = []
          data.forEach(el => {
            instance.push(new Employee(
              el.name,
              el.position,
              el.username,
              el.password
            ))
          });
          cb(null, instance)
        }
      })
    }

    static register(value, cb){
      this.read((err, data) => {
        if(err){
          cb(err, null);
        }else{
          data.push({
            id: data[data.length - 1].id + 1,
            name: value[0],
            position: value[3],
            username: value[1],
            password: value[2],
            isLogin: false
          });
  
          fs.writeFile('./data/employee.json', JSON.stringify(data, null, 2), (err) => {
            if(err){
              cb(err, null);
            } else{
              cb(null, data);
            }
          })
        }
      })
    }

    static login(data, cb){
      let username = data[0];
      let password = data[1];

      this.read((err, data) => {
        if(err){
          cb(err, null);
        } else {
          data.forEach(el => {
            if(el.username === username && el.password === password){
              if(!el.isLogin){
                el.isLogin = true;
                fs.writeFile('./data/employee.json', JSON.stringify(data, null, 2), (err) => {
                  if(err){
                    cb(err, null)
                  } else {
                    cb(null, true)
                  }
                })
              }else {
                cb(null, 'You have been logged in!')
              }
            }
          });
          cb(null, 'Wrong username / password')
        }
      })
    }

    static addPatient(newPatient, cb){
      fs.readFile('./data/patient.json', (err, data) => {
        if(err){
          cb(err, null);
        } else {
          let dataPatient = JSON.parse(data);
          let patientPerson = newPatient[0];
          let patientName = newPatient[1];
          let diagnosis = newPatient.slice(2);

          this.read((err, data) => {
            if(err){
              cb(err, null);
            } else {
              let dataEmployee = data;
              let flag = false;

              dataEmployee.forEach(el => {
                if(el.isLogin){
                  if(el.position === 'dokter'){
                    flag = true;
                    for (let i = 0; i < patientPerson; i++) {
                      dataPatient.push({
                        id: dataPatient[dataPatient.length - 1].id + 1,
                        name: patientName,
                        diagnosis: diagnosis
                      });
                    }
                    fs.writeFile('./data/patient.json', JSON.stringify(dataPatient, null, 2), (err) => {
                      if(err){
                        cb(err, null);
                      } else {
                        cb(null, true);
                      }
                    })
                  } 
                }
              });
              if(flag){
                cb(null, true);
              } else {
                cb(null, `can't have an access to add patient!`);
              }
            }
          })
        }
      })
    }

    static logout(cb){
      this.read((err, data) => {
        if(err) {
          cb(err, null);
        } else {
          data.forEach(el => {
            if(el.isLogin){
              el.isLogin = false;
              fs.writeFile('./data/employee.json', JSON.stringify(data, null, 2), (err) => {
                if(err){
                  cb(err, null);
                } else {
                  cb(null, true);
                }
              })
            }
          });
        }
      })
    }
}

module.exports = Model;
