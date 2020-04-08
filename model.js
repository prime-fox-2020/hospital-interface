const fs = require('fs');

const Employee = require('./employee');
const Patient = require('./patient');
var obj = {};

class Model {
	static register(params, callback1) {
		fs.readFile('./employee.json', 'utf8', (err, data) => {
			if (err) {
				callback1(err, null);
			} else {
				const kotak = [];
				const dataParse = JSON.parse(data);

				dataParse.push(new Employee(params[0], params[1], params[2], params[3]));
				kotak.push(params[2], params[3], params[1], dataParse.length);
				const ketik = JSON.stringify(dataParse, null, 2);
				fs.writeFile('./employee.json', ketik, (err, data) => {
					if (err) {
						callback1(err, null);
					}
				});
				callback1(null, kotak);
			}
		});
	}

	static login(params, callback2) {
		fs.readFile('./employee.json', 'utf8', (err, data) => {
			if (err) {
				callback2(err, null);
			} else {
				const dataParse = JSON.parse(data);
				let kotak = [];
				for (var i = 0; i < dataParse.length; i++) {
					if (params[0] === dataParse[i].name && params[1] === dataParse[i].password) {
						kotak.push(params[0]);
						obj.name = params[0];
						let position = dataParse[i].position;
						let name = dataParse[i].name;
						fs.readFile('./login.json', 'utf8', (err, data1) => {
							if (err) {
								callback2(err, null);
							} else {
								let dataParse2 = JSON.parse(data1);
								dataParse2 = [ { name: name, role: position } ];

								const tulis = JSON.stringify(dataParse2, null, 2);
								fs.writeFile('./login.json', tulis, (err, data) => {
									if (err) {
										callback2(err, null);
									}
								});
							}
						});
					}
				}

				callback2(null, kotak);
			}
		});
  }
  
  static addPatient(params, callback3){
    fs.readFile('./patient.json', 'utf8', (err,data)=>{
      if(err){
        callback3(err, null)
      }else{
        const patient = JSON.parse(data)
        fs.readFile('./login.json', 'utf8', (err,data)=>{
          if(err){
            callback3(err,null)
          }else{
            const login = JSON.parse(data)
            
            let kotak = []
            if(login[0].role ==='docter'){
              patient.push(new Patient(params[0], params[1], params[2]))
              kotak.push(patient.length)
              
            }
           
            const tulis = JSON.stringify(patient, null, 2)
            
          
            fs.writeFile('./patient.json', tulis, (err, data) =>{
              if(err){
                callback3(err, null)
              }
              
            })
            callback3(err,kotak)
          }
          
        })
       
         
      }
     
    })
  }
}

module.exports = Model;
