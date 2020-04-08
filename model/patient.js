const fs = require("fs");
const Employee = require("../model/employee");
const dbPath = "./patient.json";

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id;
    this.name = name;
    this.diagnosis = diagnosis;
  }
  static readDataPatient(cb) {
    fs.readFile(dbPath, "utf8", function(err, dataPatient) {
      if (err) {
        cb(err, null);
      } else {
        dataPatient = JSON.parse(dataPatient);
        cb(null, dataPatient);
      }
    });
  }
  static saveDataPatient(input, cb) {
    input = JSON.stringify(input, null, 2);
    fs.writeFile(dbPath, input, "utf8", function(err) {
      if (err) {
        cb(err);
      } else {
        cb(null);
      }
    });
  }

  static addPatient(data, cb) {
    let patientBaru = new Patient(data[0], data[1], data[2]);
    Patient.readDataPatient(function(err, dataPatient) {
      if (err) {
        cb(err);
      } else {
        dataPatient.push(patientBaru);
        Patient.saveDataPatient(dataPatient, function(err) {
          if (err) {
            cb(err);
          }
        });
        cb(null, dataPatient);
      }
    });
  }
}
module.exports = Patient;
