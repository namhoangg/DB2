module.exports = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    req.flash("error", "Please enter username and password");
    res.redirect("/user/login");
    return;
  }
  next();
};
