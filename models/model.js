const Employee = require('./employee');
const Patient = require('./patient');
const fs = require('fs');


class Model{
    static read(cb){
        fs.readFile('./data/employee.json', 'utf-8', (err, data) => {
            if(err){
              cb(err, null)
            }
            data = JSON.parse(data);
            cb(null, data);
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

          console.log(data)
  
          fs.writeFile('./data/employee.json', JSON.stringify(data, null, 2), (err) => {
            if(err){
              cb(err, null);
            } else{
              console.log('MASOOK')
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
                console.log(el)
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
}

module.exports = Model;
