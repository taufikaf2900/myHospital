class Helper {
  static generateFullGender(value) {
    if(value === 'M') {
      return 'Male';
    }
    return 'Female';
  }
}

module.exports = Helper;