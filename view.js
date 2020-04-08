class View {
	static printError(err) {
		console.log(`error bro ni buktinya \n ---------- ${err}`);
	}

	static printSucces(data) {
		console.log(
			`sukses ya brooo ngesavenya {Username : ${data[0]}, Password : ${data[1]}, Role : ${data[2]}}.Total employee : ${data[3]} `
		);
	}

	static login(data) {
		if (data.length !== 0) {
			console.log(`user ${data[0]} login succesfully`);
		} else {
			console.log('username/password wrong');
    }
    
    if(data[0] ==='nanda'){
      console.log('halo ayanggggg')
    }
  }
  static addPatient(data){
    if(data.length === 0){
      console.log(`kamu bukan dokter, it means gk boleh nambah patient`)
    }else{
      console.log(`Patien berhasil di tambah, total patient ${data[0]}`)
    }
  }
}

module.exports = View;
