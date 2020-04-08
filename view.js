class View {

  static command() {
    console.log("node index.js help" );
    console.log("node index.js showE" );
    console.log("node index.js registerE" );
    console.log("node index.js login" );
    console.log("node index.js addPatient" );
    console.log("node index.js showP" );
    console.log("node index.js logout" );
  }

  static error() {
    console.log("ERROR");
  }

  static success(data) {
    console.log("SUCCESS", data);
  }

  static successShowDataE(data) {
    console.log("This is your employees : ", data);
  }

  static successShowDataP(data) {
    console.log("This is your patients : ", data);
  }


}


module.exports = View;
