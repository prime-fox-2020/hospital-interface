'use strict'
const fs        = require('fs');
const Employee  = require('./class/employee.js');
const Patient   = require('./class/patient.js')
const employeeAddress = './db/employee.json';
const patientAddress = './db/patient.json';

class Model {
  //Main Function
  static read(location,callbackRead){
    fs.readFile(location, 'utf8', (err, data) => {
      if(err) callbackRead(err, null);
      else {
        const dataRead = JSON.parse(data)
        callbackRead(null, dataRead);
      }
    });
  }

  static save(location, data, callbackWrite) {
    data = JSON.stringify(data, null, 2);
    fs.writeFile(location, data, (err) =>{
      if(err) callbackWrite(err)
    })
  }

  //Sub Function
  static create(name, password, username, position, callbackCreate){
    this.read(employeeAddress, (err, data) => {
      if(err) callbackCreate(err, null);
      else{
        const newMember = new Employee(data[1].length+1, name, password, username, position);
        data[1].push(newMember);
        callbackCreate(null, [JSON.stringify(newMember), data[1].length]);
        this.save(employeeAddress,data, (err) =>{
          if(err) callbackCreate(err, null);
        });
      } 
    });
  }

  static authenticate(username, password, callbackAuth){
    Model.read(employeeAddress, (err,data) => {
      if(err) callbackAuth(err, null);
      else{
        //Search name and password in data
        if(data[0].length) {
          callbackAuth(null, [data[0][0].username, -1]);
        }
        else{
          let check = false;
          for(let dt of data[1]){
            if(dt.username === username && dt.password === password){
              check = true;
              data[0].push(dt);
            }
          }
          if(!check) callbackAuth(null, -1);
          else {
            Model.save(employeeAddress, data, (err) => {
              if(err) callbackAuth(err, null);
            })
            callbackAuth(null, username);
          }
        }
      }
    });
  }
  
  static addPatient(id, name, disease, callbackPatient){
    Model.read(employeeAddress,(err, data) => {
      if(err) callbackPatient(err, null);
      else{
        if(data[0][0].position === 'doctor' || data[0][0].position === 'dokter'){
        Model.read(patientAddress, (err, data) =>{
          if(err) callbackPatient(err, null);
          else{
            data.push(new Patient(data.length+1, name, disease));
            Model.save(patientAddress, data, (err) => {
              if(err) callbackPatient(err, null);
            });
            callbackPatient(null, data.length);
          }
        });
        }else{
          callbackPatient(null, -1);
        }
      }
    });
  }

  static logout(callbackLogout){
    Model.read(employeeAddress, (err, data) => {
      if(err) callbackAuth(err);
      else{
        data[0] = [];
        Model.save(employeeAddress, data, (err) => {
          if(err) callbackLogout(err, null);
        });
        callbackLogout(null, data[0]);
      }
    });
  }
}



module.exports = Model;