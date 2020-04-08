class Position {
  constructor(bool) {
    this._isDoctor = bool
  }

  get isDoctor() {
    return this._isDoctor
  }
  set isDoctor(bool) {
    this._isDoctor = bool
  }
}

module.exports = Position