const Position = require('./Position')

class Dokter extends Position {
  constructor() {
    super(true)
    this._name = 'Dokter'
  }
  get name(){
    return this._name
  }
}

module.exports = Dokter