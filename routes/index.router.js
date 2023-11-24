const userRouter = require("./user.router");
const manageRouter = require("./manage.router");
const authMiddleware = require("../middlewares/auth.middleware");
module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/manage", authMiddleware.auth, manageRouter);
  app.use("/", (req, res) => {
    res.redirect("/manage");
  });
};
