const db = require("../configs/database");
module.exports.auth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    req.flash("error", "Please login");
    return res.redirect("/user/login");
  } else {
    sql = `SELECT * FROM user WHERE token = ?`;
    data = [req.cookies.tokenUser];
    const result = await db.querySql(sql, data);
    if (result.length > 0) {
      next();
    } else {
      req.flash("error", "Please login");
      return res.redirect("/user/login");
    }
  }
};
