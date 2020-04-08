const Position = require('./Position')

class OfficeBoy extends Position {
  constructor() {
    super(false)
    this._name = 'Office Boy'
  }
  get name() {
    return this._name
  }
}

module.exports = OfficeBoy