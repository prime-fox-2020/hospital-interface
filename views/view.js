class View{
    static listEmployee(instance){
        instance.forEach(e => {
            console.log(e);
        });
    }

    static register(name, position){
        console.log('=-=-=-SUCCESS REGISTER-=-=-=');
        console.log(`Added "${name}" as "${position}" to your Employee Database`);
    }

    static login(data){
        if(data.length > 2){
            console.log(data);
        } else {
            console.log('=-=-=-SUCCESS LOGIN-=-=-=');
            console.log(`user ${data[0]} logged in successfully`)
        }
    }

    static addPatient(data){
        if(data.length > 1){
            console.log(data);
        } else {
            console.log('=-=-=-SUCCESS ADD-=-=-=');
            console.log(`Added new Patient. Total patient data: ${data[0]}`)
        }
    }

    static logout(){
        console.log('=-=-=-SUCCESS LOGUT-=-=-=');
        console.log('user has been successfully logout');
    }
}

module.exports = View;