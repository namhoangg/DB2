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
router(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
