class View {
    static register(objData, fetchData) {
        console.log(`Save data succes ${JSON.stringify(objData)}. Total employee: ${fetchData.length}`);
    }

    static login(status, objLogin) {
        if (status === true) {
            console.log(`User ${objLogin.username} logged in successfully`);
        } else if (status === false) {
            console.log(`Username / password wrong`);
        }
    }

    static patient(status, fetchPatient) {
        if (status === true) {
            console.log(`Data pasien berhasil ditambahkan. Total data pasien: ${fetchPatient.length}`);
        } else if (status === false) {
            console.log(`Tidak memiliki akses untuk add pasien`);
        }
    }


} // end class view

module.exports = View