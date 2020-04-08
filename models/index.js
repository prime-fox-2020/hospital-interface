'use strict'

const fs = require('fs');
const EmployeeFile = './db/employee.json';
const PatientFile = './db/patient.json';
const SessionFile = './db/session.json';

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
  }
}

class Crud {
  /* 
  * All CRUD function goes here
  */

  static pool(schema, callback) {

    fs.readFile(schema == 'employee' ? EmployeeFile : schema == 'patient' ? PatientFile : SessionFile, 'utf8', (err, data) => {
        if (err) {
            callback(true, err)
        } else {
            callback(false, JSON.parse(data))
        }
    })

  }

  /* 
  * CREATE & UPDATE user login session
  */
  
  static session = username => {
    fs.readFile('./db/session.json', 'utf8', (err, data) => {
      if (err) {
        let session = [{session_id : 1, user: username}];
        this.writeFile('session', session)
      
      } else {

        data = JSON.parse(data);
        data.push({session_id: data.length + 1, user: username});
        this.writeFile('session', data)
      
      }
    })
  }

  static writeFile = (schema, content) => {

    fs.writeFileSync(schema == 'employee' ? EmployeeFile : schema == 'patient' ? PatientFile : SessionFile, JSON.stringify(content, null, 2))

  }

  /* 
  * login & session checking
  */

  static inSession = (username, callback) => {
    this.pool('session', (err, data) => {
      if (err) {
        callback(true, err)
      } else {
        data.forEach(element => {
          if (element.user == username) {
            callback(true, element.user)
          }
        })
      }
    })
  }

  static login(db, user, password, callback) {

    let userExist = db.filter(element => element.username == user && element.password == password);

    if (userExist.length > 0) {
      callback(false, userExist[0])
    } else {
      callback(true, null)
    }
  }
}

module.exports = {Patient, Employee, Crud}
