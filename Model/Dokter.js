const Position = require('./Position')

class Dokter extends Position {
  constructor() {
    super(true)
    this.name = 'Dokter'
  }
}

module.exports = Dokter