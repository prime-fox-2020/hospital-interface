class ViewHospital {
    static displayData(data) {
        console.log(data);
    }
    static displayError(err) {
        console.log("Something wrong!\n");
        console.log(err);
    }

    static displayLoggedIn(user) {
        console.log(`User ${user} already logged in. To switch account, please log out first.`);
    }
    static loginSucces(user) {
        console.log(`User ${user} successfully logged in.`);
    }
    static logoutSucces() {
        console.log("User succesfully logged out.");
    }
    static wrongUserPass() {
        console.log("Wrong username / password.");
    }
    static notDoctor() {
        console.log("Sorry. Only doctor that allowed to input patient data.");
    }
    static notAdmin() {
        console.log("Sorry. Only admin can open the data.");
    }
    static addPatientSucces(totalPatient) {
        console.log(`Patient data succesfully added to the list. Total patient now: ${totalPatient} person`)
    }
    
    static help() {
        console.log("#===== Hospital Commands Center =====#");
        this.showHelpLogin();
        this.showHelpLogout();
        this.showHelpDisplay();
        this.showHelpRegister();
        this.showHelpAddPatient();
    }
    static showHelpDisplay() {
        console.log("\nnode index.js showData [patient | employee]\n# show employee or patient data (for admin only)");
    }
    static showHelpRegister() {
        console.log("\nnode index.js register [name] [user_name] [password] [position] \n# register employee to the hospital system\n# position: doctor, nurse, pharmacist, receptionist, admin, office_boy");
    }
    static showHelpLogin() {
        console.log("\nnode index.js login [userNname] [password]\n# login to the hospital system");
    }
    static showHelpLogout() {
        console.log("\nnode index.js logout\n# logout from the hospital system");
    }
    static showHelpAddPatient() {
        console.log("\nnode index.js addPatient [name] [diagnosis_1] [diagnosis_2] ... [diagnosis_N]\n# Only doctor that can add patient");
    }
    static showHelpWrongFormat() {
        console.log("The data that you enter is not according to the format. Below is the right format.");
    }
    static commandNotFound() {
        console.log("Command not found.\nTry 'node index.js help'");
    }
}

module.exports = ViewHospital;