const Position = require('./Position')

class Receptionist extends Position {
  constructor() {
    super(false)
    this._name = 'Receptionist'
  }
  get name() {
    return this._name
  }
}

module.exports = Receptionist