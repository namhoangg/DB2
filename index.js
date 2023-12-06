const express = require("express");
const app = express();
const flash = require("express-flash");


const router = require("./routes/index.router");
require("dotenv").config();
const db = require("./configs/database");
const cookieParser = require("cookie-parser");
const session = require("express-session");
db.connect();
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
app.use(cookieParser("secret"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

app.get("/testmysql2", async (req, res) => {
  try {
    let totalExecTime = 0;
    for (let i = 0; i < 1000; i++) {
      let start = new Date().getTime();
      let result = await db.querySql(
        "SELECT * FROM patient  LIMIT 10 OFFSET 0 "
      );
      let end = Date.now();
      totalExecTime += (end - start) / 1000;
    }
    res.send(`Average Exec Time: ${totalExecTime / 1000}`);
  } catch (err) {
    console.log(err);
  }
});
//test for odbc
router(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
