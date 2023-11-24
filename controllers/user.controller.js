const db = require("../configs/database");
const bcrypt = require("bcrypt");
//[GET] /user/login
module.exports.index = (req, res) => {
  res.render("pages/user/index", {
    title: "User",
  });
};
//[POST] /user/login
module.exports.login = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const sql = `SELECT * FROM user WHERE username = ?`;
  try {
    const result = await db.querySql(sql, [username]);
    if (result.length > 0) {
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (isMatch) {
        res.cookie("tokenUser", result[0].token, {
          maxAge: 86400000,
          httpOnly: true,
        });
        req.flash("success", "Login successfully");
        res.redirect("/");
      } else {
        req.flash("error", "Password is incorrect");
        res.redirect("/user/login");
      }
    } else {
      req.flash("error", "Username is not exist");
      res.redirect("/user/login");
    }
  } catch (err) {
    console.log(err);
    req.flash("error", "Something went wrong");
    res.redirect("/user/login");
  }
};
//[GET] /user/logout
module.exports.logout = (req, res) => {
  res.clearCookie("tokenUser");
  req.flash("success", "Logout successfully");
  res.redirect("/user/login");
};
