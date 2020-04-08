
class View{
    static viewHelp(){
        console.log(`        ======== HOSPITAL INTERFACE ========
        node index.js register [myName] [myPosition] [myUsername] [myPassword]     === khusus employee
        node index.js viewAllEmployee                                              === bisa kapan saja tanpa login
        node index.js login [myUsername] [myPassword]                              === khusus employee
        node index.js addPatient [patientName] [sakit1] [sakit2] [sakit3]          === khusus role dokter
        node index.js viewAllPatient                                               === bisa siapa saja asal login terlebih dahulu
        node index.js logout                                                       === khusus employee
        ===============================`)
    }
    static printError(err){
        console.log(err)
    }
    static printSuccess(data){
        console.log(data)
    }
}

module.exports = View