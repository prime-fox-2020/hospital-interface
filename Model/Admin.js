const Position = require('./Position')

class Admin extends Position {
  constructor() {
    super(false)
    this._name = 'Admin'
  }
}

module.exports = Admin