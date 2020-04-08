class ViewHospital {
    static displayData(data) {
        console.log(data);
    }
    static displayError(err) {
        console.log("Something wrong!\n");
        console.log(err);
    }

    static displayLoggedIn() {
        console.log("You already logged in. To switch account please log out first.");
    }
    static loginSuccesfull(user) {
        console.log(`User ${user} successfully logged in.`);
    }
    static wrongUserPass() {
        console.log("Wrong username / password.");
    }
    
    static help() {
        console.log("Hospital Interface Commands");
        this.showHelpDisplay();
        this.showHelpRegister();
    }
    static showHelpDisplay() {
        console.log("\nnode index.js showData [patient | employee]\n# show employee or patient data");
    }
    static showHelpRegister() {
        console.log("\nnode index.js register [name] [user_name] [password] [position] \n# register employee to the hospital system\n# position: doctor, nurse, pharmacist, receptionist, admin, office_boy");
    }
    static showHelpLogin() {
        console.log("\nnode index.js login [userNname] [password]\n# login to the hospital system\n");
    }
    static showHelpWrongFormat() {
        console.log("The data that you enter is not according to the format. Below is the right format.");
    }
    static commandNotFound() {
        console.log("Command not found.\nTry 'node index.js help'");
    }
}

module.exports = ViewHospital;