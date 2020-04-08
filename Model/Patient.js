class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this._name = name
    this._diagnosis = diagnosis
  }

  get name() {
    return this._name
  }
  set name(name) {
    this._name = name
  }
  get diagnosis() {
    return this._diagnosis
  }
  set diagnosis(diagnosis) {
    this._diagnosis = diagnosis
  }

  static createOne(id, name, diagnosis) {
    return new Patient(id, name, diagnosis)
  }
}

module.exports = Patient