class View {
  static help() {
    console.log(`
    ********  Selamat Datang Di Aplikasi Rumah Sakit  ***********
    =========================================================== *
    ******************* silakan pilih menu **********************
    *                                                           *
    *    node index.js help                                     *
    *    node index.js register <name> <jabatan> <password>     *
    *    node index.js login <userid / name> <password>         *
    *    node index.js logout                                   *
    *    node index.js addPatient <id> <name> <diagnose>        *
    *                                                           *
    *                                                           *
    *                                                           *
    *********************************************************** *
    `);
  }

  static viewData(input) {
    console.log(
      `save data succsess ${JSON.stringify(
        input[input.length - 1],
        null,
        2
      )}, total employe = ${input.length}`
    );
  }
  static error() {
    console.log("********** ERROR **************");
  }
  static viewDisplay(input) {
    console.log(input);
  }

  static viewErrorLogin() {
    console.log(`
                  *** ERROR ***
****************************************************        
* Apliaksi tidak support dual login!               *
* silakan logout terlebih dahulu dengan mengetikan *
* node index.js logout                             *
****************************************************
`);
  }
}

module.exports = View;
