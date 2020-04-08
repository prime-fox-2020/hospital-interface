class View{
    static listEmployee(instance){
        instance.forEach(e => {
            console.log(e);
        });
    }

    static register(name, position){
        console.log('=-=-=-SUCCESS-=-=-=');
        console.log(`Added "${name}" as "${position}" to your Employee Database`);
    }

    static login(data){
        if(data.length > 2){
            console.log(data);
        } else {
            console.log('=-=-=-SUCCESS-=-=-=');
            console.log(`user ${data[0]} logged in successfully`)
        }
    }
}

module.exports = View;