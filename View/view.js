class View {
    static showHelp(){
        console.log(`
        $ node index.js 
        $ node index.js help
        $ node index.js register <name> <username> <password> <position>
        $ node index.js login <username> <password>
        $ node index.js logout
        $ node index.js addPatient <patient> <diagnosis>
        `);
        
    }

    static showList(data){
        console.table(data)
    }

    static message(message) {
        console.log(message);
    }
}

module.exports = View