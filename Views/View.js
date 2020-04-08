class View {

  static serverError(msg) {
    console.log(msg)
  }
  static registerInfo(msg) {
    console.log(msg)
  }
  static loginInfo(msg) {
    console.log(msg)
  }
  static logoutInfo(msg) {
    console.log(msg)
  }
  static addPatientInfo(msg) {
    console.log(msg)
  }
  static showEmployee(datas) {
    console.log(datas)
  }
  static showPatient(datas) {
    console.log(datas)
  }
  static help() {
    console.log(`
$ node index.js help
$ node index.js register <name> <username> <password> <position>
$ node index.js login <username> <password>
$ node index.js addPatient <name> <diagnosis>
$ node index.js employees
$ node index.js patiens
$ node index.js logout
`)
  }
  static errorCmd(cmd) {
    console.log(`node index.js: "${cmd}" is not a valid command. Try "node index.js help"`)
  }
}

module.exports = View