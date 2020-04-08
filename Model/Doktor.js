const Position = require('./Position')

class Doktor extends Position {
  constructor() {
    super(true)
    this._name = 'Doktor'
  }
  get name(){
    return this._name
  }
}

module.exports = Doktor