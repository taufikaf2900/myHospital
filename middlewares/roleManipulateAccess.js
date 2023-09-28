const roleManipulateAccess = (req, res, next) => {
  const role = req.session.role;

  if(role !== 'superadmin') {
    res.redirect('/hospital/patient?error=you have no access only superadmin has access');
  } else {
    next();
  }
}

module.exports = roleManipulateAccess;