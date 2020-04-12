class View {

    static show(data) {
        console.log(data)
    }

    static printError(){
        console.log('Error')
    }

    static register(name, position) {
        console.log(`save data succes  "username: ${name}", "position: ${position}  `)
    }

    static login (data) {
        if(data.length > 2) {
            console.log(data)
        } else {
            console.log(`user ${data[0]} success login`)
        }
    }

    static add(data) {
        console.log(`suceess add patient, total patient ${data[0]}`)
    }

    static logout() {
        console.log('logout success')
    }
}

module.exports = View