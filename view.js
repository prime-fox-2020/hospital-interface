class View{
    static registerEmployeeError(error){
        console.log(error)
    }
    static registerEmployeeSuccess(dataString,data){
        console.log(`save data success ${dataString}. Total Employee: ${data.length}`)
    }
    static alreadyLogin(data){
        console.log(`user ${data} still logged in. You need to logout first`)
    }
    static loginError(){
        console.log(`username/password wrong `)
    }
    static loginSuccess(params){
        console.log(`user ${params[0]} logged in succesfully`)
    }
    static addPatientSuccess(data){
        console.log(`data pasien berhasil ditambahkan. Total data pasien: ${data[data.length-1].id}`)
    }
    static addPatientError(data){
        console.log(data)
    }
    static logoutSuccess(){
        console.log(`user has been successfully logout`)
    }
    static logoutError(){
        console.log(`no one user log in`)
    }
}

module.exports=View