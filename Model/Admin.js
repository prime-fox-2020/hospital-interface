const Position = require('./Position')

class Admin extends Position {
  constructor() {
    super(false)
    this._name = 'Admin'
  }
  get name() {
    return this._name
  }
}

module.exports = Admin