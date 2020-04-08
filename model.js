const fs = require('fs');
const Employee = require('./employee');
const Patient = require('./patients');

class Model {

  static findAll(callback1) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        callback1(err, null);
      }
      else {
        const dataParse = JSON.parse(data);
        const dataConvert = [];
        for (let i = 0; i < dataParse.length; i++) {
          dataConvert.push(new Employee(dataParse[i].id, dataParse[i].name, dataParse[i].position, dataParse[i].username, dataParse[i].password, false));
        }
        callback1(null, dataConvert);
      }
    });
  }

  static createOneE(input, callback2) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        callback2(err, null);
      }
      else {
        const dataParse = JSON.parse(data);
        let newID= 0;

        if (dataParse.length === 0) {
          newID = 1;
        }
        else {
          newID = dataParse[dataParse.length-1].id +1;
        }
        dataParse.push({
          id: newID,
          name: input[0],
          position: input[1],
          username: input[2],
          password: input[3],
          status: false
          });
          const dataStr = JSON.stringify(dataParse, null, 2)
          fs.writeFile("./employee.json", dataStr, (err) => {
            if (err) {
              callback2(err, null);
            }
            else {
              callback2(null,`Member ${input[0]} was successfully added`);
            }
          });
        }
    });
  }

  static login (input, callback3) {
    fs.readFile("./employee.json", "utf8", (err, data) => {
      if (err) {
        callback3(err, null);
      }
      else {
        const dataParse = JSON.parse(data);
        let flagLogin = false;
        let usernameLogin= "";

        for (let i = 0; i < dataParse.length; i++) {
          if (dataParse[i].status === true) {
            flagLogin = true;
            usernameLogin+=dataParse.name;
          }
        }
        if (!flagLogin) {
          callback3(`User ${usernameLogin} still logged in`, null)
        }
        else {
          let userName = input[0];
          let loginPass = input[1];
          let statusFlag = false;

          for (let i = 0; i < dataParse.length; i++) {
            if (userName === dataParse[i].username && loginPass === dataParse[i].password) {
              dataParse[i].status = true;
              statusFlag = true;
            }
          }
          if (statusFlag === false) {
            callback3("Username/ password is wrong!");
          }
          else {
            const dataStr = JSON.stringify(dataParse, null, 2);
            fs.writeFile("./employee.json", dataStr, (err) => {
              if (err) {
                callback3(err, null);
              }
              else {
                callback3(null,`Welcome ${input[0]} logged in successfully!`)
              }
            });
          }
        }
      }
    });
  }

  static logout () {

  }

  static findAllP(callback4) {
    fs.readFile("./patients.json", "utf8", (err, data) => {
      if (err) {
        callback4(err, null);
      }
      else {
        const dataParse = JSON.parse(data);
        const dataConvert = [];
        for (let i = 0; i < dataParse.length; i++) {
          dataConvert.push(new Patient(dataParse[i].id, dataParse[i].name, dataParse[i].diagnosis));
        }
        callback4(null, dataConvert);
      }
    });
  }


  static createOneP(input, callback5) {
    fs.readFile("./patients.json", "utf8", (err, data) => {
      if (err) {
        callback5(err, null);
      }
      else {
        let dataParse = JSON.parse(data);
        let izin = false;
        for (let i = 0; i < dataParse.length; i++) {
          if (dataParse[i].position === "Doctor" && dataParse[i]=== true) {
            izin = true;
          }
        }
        if (!izin) {
          callback5(`User is not a doctor`, null);
        }
        else {
        fs.readFile("./patients.json", "utf8", (err, data) => {
          if (err) {
            callback5(err, null);
          }
          else {
            const dataParse = JSON.parse(data);
            let newID= 0;

            if (dataParse.length === 0) {
              newID = 1;
            }
            else {
              newID = dataParse[dataParse.length-1].id +1;
            }
            dataParse.push({
              name: input[0],
              diagnosis: input[1],
              });
              const dataStr = JSON.stringify(dataParse, null, 2)
              fs.writeFile("./patients.json", dataStr, (err) => {
                if (err) {
                  callback5(err, null);
                }
                else {
                  callback5(null,`Patient ${input[0]} was successfully added`);
                }
              });
            }
          });
        }
      }
    })
  }

  //END MODEL ==================================
}




module.exports = Model;
