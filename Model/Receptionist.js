const Position = require('./Position')

class Receptionist extends Position {
  constructor() {
    super(false)
    this.name = 'Receptionist'
  }
}

module.exports = Receptionist