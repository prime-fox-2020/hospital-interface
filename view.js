class View {
    static register(objData, fetchData) {
        console.log(`You just register ${objData.username}. Total employee: ${fetchData.length}`);
    }

}


module.exports = View