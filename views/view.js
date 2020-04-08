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

    static login(data) {
        console.log('Login Succses')
    }

    static addPatient(data){
        console.log(`added new data patient. total patient: ${data[0]} `)
    }

    static logout() {
        console.log('user has been successfully logout!')
    }
}

module.exports = View