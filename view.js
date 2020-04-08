class View {
    static help(){
        console.log(`help: shows the available commands\nregister <name> <position> <username> <password>: create account\nlogin <username> <password>: login to the registered account\nlogout: log out from the current account\naddPatient <Patient_Name> <Diagnose1> <Diagnose2> ... <Diagnose_n> : add new patient (Doctor Only!)`)
    }
    static display(param){
        console.log(param)
    }

}

module.exports = View