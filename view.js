class View{
    static showError(err){
        console.log(err)
    }

    static register(data){
            console.log(`save data success {"username": ${data[data.length-1][0]}, "password" : ${data[data.length-1][1]}, "role" : ${data[data.length-1][2]}}. Total employee : ${data[data.length-1][3]}`)
    }
    static login(data){
        if(!data){
            console.log(`username / password wrong`)
        }else{
            console.log(`user ${data} logged in successfully`)
        }
    }
    static addPatient(data){
        if(!data){
            console.log(`tidak memiliki akses untuk add patient`)
        }else{
            console.log(`data pasien berhasil ditambahkan. Total data pasien : ${data}`)
        }
    }
    static logout(data){
        if(data){
            console.log(`user has been successfully logout`)
        }
    }
    static loginFailed(data){
        console.log(`user ${data} still logged in. you need to logout first`)
    }
}

module.exports = View