class View {
  static showError(err) {
    console.log(`Error message: \nusername: "${err}" already registered`);
  }

  static showCreate(data, total) {
    let obj = {username: data.username, password: data.password, role: data.position};
    console.log(`save data success ${JSON.stringify(obj)}, Total employee : ${total}`);
  }

  static showLogin(log) {
    console.log(`user ${log} logged in succesfully`);
  }

  static loginFail(err) {
    if (err) {
      console.log(`user ${err.username} still logged in. you need to logout first`);
    } else {
      console.log('wrong username / password');
    }
  }

  static addPatient(total) {
    console.log('data pasien berhasil ditambahkan. Total data pasien :', total);
  }

  static notDokter() {
    console.log('tidak memiliki akses untuk menambahkan pasien');
  }

  static logout() {
    console.log('user has been successfully logout!');
  }

  static command(check) {
    if (!check) {
      console.log('command not found!');
    }
    console.log('list command:');
    console.log('node index.js register');
    console.log('node index.js login');
    console.log('node index.js addPatient');
    console.log('node index.js logout');
  }
}

module.exports = View;