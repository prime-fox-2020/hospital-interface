'use strict'
const Controller  = require('./controller');
const app         = process.argv.slice(2);
const task        = app[0];


// console.log(name, password, username, role)
if(task === `register`) {
  const name        = app[1];
  const password    = app[2];
  const username    = app[3];
  const position    = app[4];
  Controller.register(name, position, username, password);
}
if(task === 'addPatient') {
  const id      = app[1];
  const name    = app[2];
  const disease = app.slice(3);
  Controller.addPatient(id, name, disease);
}
if(task === 'login') {
  const username = app[1];
  const password = app[2];
  Controller.authentication(username, password);
}
if(task === 'logout'){
  Controller.logout();
}
