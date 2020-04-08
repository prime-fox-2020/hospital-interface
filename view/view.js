class View {

    static printHelp() {
        console.log('List command :')
        console.log('--------------------------------------------------------')
        console.log('1. node index.js help')
        console.log('2. node index.js list')
        console.log('3. node index.js register <name> <position> <username> <password>')
        console.log('4. node index.js login <username> <password>')
        console.log('5. node index.js addPatient <nama> <diagnosis> <-- command khusus Dokter')
        console.log('6. node index.js logout')
    }

    static print(msg) {
        console.log(msg)
    }

    static printData(data) {
        console.table(data)
    }
}

module.exports = View