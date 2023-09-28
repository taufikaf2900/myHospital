const roleViewAccess = (req, res, next) => {
  const role = req.session.role;

  if(role === 'patient') {
    res.redirect('/hospital/patient?error=you have no access only superadmin or doctor has access');
  } else {
    next();
  }
}

module.exports = roleViewAccess;