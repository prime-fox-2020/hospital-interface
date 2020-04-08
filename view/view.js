class View {
  static printError(err) {
    console.log(err)
  }

  static printSuccess(data){
    console.log(data)
  }

  static help(){
    console.log('------------------------- HELP -------------------------\n')
    console.log('$ node index.js help')
    console.log('$ node index.js listEmployee')
    console.log('$ node index.js register <your name> <username> <password> <position>')
    console.log('$ node index.js login <username> <password>')
    console.log('$ node index.js addPatient <patient name> <diagnosis>')
    console.log('$ node index.js logout\n')
    console.log('------------- WELCOME TO HOSPITAL INTERFACE -------------')
  }
}

module.exports = View