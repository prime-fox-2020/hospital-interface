class View {
    static kosong(data) {
        console.log(data);
        
    }
    static help(data) {
        console.log(data);
    }

    static listEmployee(data) {
        console.log('Daftar employee ');
        console.log("=========================");
        console.log(data);
        
        // for (let i in data) {
        //     console.log(`${data[i].id} ${data[i].name}, position: ${data[i].position}`); 
        // }
    }

    static listPatient(data) {
        console.log('Daftar Patient ');
        console.log("=========================");
        console.log(data);
        
        // for (let i in data) {
        //     console.log(`${data[i].id} ${data[i].name}, diagnosis: ${data[i].diagnosis}`); 
        // }
    }
    
    static registerEmployee(data) {
        console.log(data);
    }

    static login(data) {
        console.log(data);
    }

    static addPatient(data) {
        console.log(data);
    }

    static logout(data) {
        console.log(data);
    }

}

module.exports = View