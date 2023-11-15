const db = require("../configs/database");
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
  const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;

  const result = await db.querySql(sql, [username, password]);
  console.log(result);
  if (result.length === 0) {
    res.send("fail");
    return;
  }
  res.send("ok");
};
