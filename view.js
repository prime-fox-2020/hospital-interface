

class View {

    static viewMessage(message){
        console.log(message)
    }

    static viewAppface(){
        console.log('\n\nSELAMAT DATANG DI HOSPITAL KAMI')
        console.log('===============================')
        console.log('Bantulah diri anda dengan memilih tujuan lalu lengkapi <opsi> dibawah ini:')
        console.log('index.js register <username> <password> <position>')
        console.log('index.js login <username> <password>')
        console.log('index.js addPatient <name> <diagnosis1> <diagnosis2> <diagnosis3>')
        console.log('index.js logout <username>\n\n')
    }
    
    static viewRegister(){
        console.log(`\nInput identitas untuk register\n`)
    }
    static viewLogin(){
        console.log(`\nSelamat datang, terima kasih sudah hadir\n`)
    }
    static viewAddpatient(){
        console.log(`\nBerikut data pasien:\n`)
    }
    static viewLogout(){
        // console.log(`\n ${param}`)
        console.log(`\nTerima kasih, sehat selalu\n`)
    }
}

module.exports = View ;