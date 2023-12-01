function validation(body, type) {
  const errors = {};
  const { PFname, PLname, PDoB, PGender, PAddress, PPhone, PTypeCode } = body;
  if (!PFname) {
    errors.PFname = "*Please enter first name";
  }
  if (!PLname) {
    errors.PLname = "*Please enter last name";
  }
  if (!PDoB) {
    errors.PDob = "*Please enter date of birth";
  }
  if (!PGender) {
    errors.PGender = "*Please select a gender";
  }
  if (!PAddress) {
    errors.Paddress = "*Please enter address";
  }

  if (!PPhone) {
    errors.PPhone = "*Please enter phone";
  }
  if (!PTypeCode) {
    errors.PtypeCode = "*Please choose patient type";
  }
  if (type == "IP") {
    const { Infee, sickroom, Nursecode, Indiagnosis } = body;
    if (!Infee) {
      errors.Infee = "*Please enter inpatient fee";
    }
    //check if infee is number
    if (isNaN(Infee)) {
      errors.Infee = "*Please enter a number";
    }
    if (!sickroom) {
      errors.sickroom = "*Please enter sick room";
    }
    if (!Nursecode) {
      errors.Nursecode = "*Please enter nurse code";
    }
  }
  return errors;
}
module.exports.register = async (req, res, next) => {
  if (req.body.PTypeCode == "OP") {
    const errors = validation(req.body, "OP");
    if (Object.keys(errors).length > 0) {
      // console.log(errors);
      // console.log(req.body);
      res.render("pages/manage/index", {
        title: "Manage",
        info: req.body,
        errors: errors,
      });
    } else {
      next();
    }
  } else if (req.body.PTypeCode == "IP") {
    const errors = validation(req.body, "IP");
    if (Object.keys(errors).length > 0) {
      res.render("pages/manage/index", {
        title: "Manage",
        info: req.body,
        errors: errors,
      });
    } else {
      next();
    }
  } else {
    req.flash("error", "Please choose valid patient type");
    res.redirect("/manage");
  }
};
