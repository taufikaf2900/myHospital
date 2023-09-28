class Helper {
  static formattedDate(date) {
    return date.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  static generateHospitalPredicate(totalRecoveredPatient, totalDiedPatient) {
    let result;
    
    if(totalDiedPatient === totalRecoveredPatient) {
      result = 'Standard';
    } else if( totalDiedPatient < totalRecoveredPatient) {
      result = 'Good';
    } else {
      result = 'Bad';
    }

    return result;
  }
}

module.exports = Helper;