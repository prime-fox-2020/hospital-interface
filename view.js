'use strict'

class View{
  static register(newMember, totalEmployee){
    console.log(`save data success ${newMember}. Total employee: ${totalEmployee}`)
  }

  static authentication(data){
    if(data === -1) console.log(`username / password wrong`);
    else if(data.length === 2 && data[1] === -1) console.log(`user ${data[0]} is still logged in. You need to logoout first`);
    else console.log(`user ${data} logged in successfully `);
  }

  static addPatient(data){
    if(data === -1) console.log(`tidak memiliki akses untuk add patient`);
    else console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data}`);
  }

  static logout(data){
    if(!data.length) console.log(`user has been successfully logout`);
    else console.log("aaaaaaa");
  }

  static errorMessage(err){
    console.log(`Upss Error ${err}`);
  }
}

module.exports = View;