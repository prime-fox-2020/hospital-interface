const fs = require("fs");
const dbPath = "./employee.json";
const { Employee } = require("./model");

class ModelEmployee {
  static findAll(cb1) {
    fs.readFile(dbPath, "utf8", (err, data) => {
      if (err) {
        cb1(err, null);
      } else {
        data = JSON.parse(data);
        cb1(null, data);
      }
    });
  }

  static create() {}
}

module.exports = ModelEmployee;
