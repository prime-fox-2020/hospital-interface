class View {
    static printFailed(err) {
        console.log(`There's error while Processing...!\n`,err)
    }
    static printDone(data) {
        console.log(`Processing ...\n`,data)
    }
}

module.exports = View
