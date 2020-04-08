class ViewHospital {
    static displayData(data) {
        console.log(data);
    }
    static displayError(err) {
        console.log(err);
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
        console.log("\nnode index.js register [name] [user name] [password] [position] \n# register employee to the system\n# position: doctor, nurse, pharmacist, receptionist, admin, office_boy");
    }
    static showHelpWrongFormat() {
        console.log("The data that you enter is not according to the format. Follow below format.");
    }
    static commandNotFound() {
        console.log("Command not found.\nTry 'node index.js help'");
    }
}

module.exports = ViewHospital;