const Position = require('./Position')

class OfficeBoy extends Position {
  constructor() {
    super(false)
    this._name = 'Office Boy'
  }
}

module.exports = OfficeBoy