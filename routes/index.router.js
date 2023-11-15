const userRouter = require("./user.router");
const manageRouter = require("./manage.router");
module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/", manageRouter);
};
