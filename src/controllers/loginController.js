const Login = require("../models/loginModel");
const Materials = require("../models/materialsModel");
exports.index = async (req, res, next) => {
  if (req.session.user) {
    const material = new Materials(req.body, req.session.user._id);
    const materials = await material.search();
    return res.render("logged", { materials });
  }
  return res.render("login");
};
exports.register = async (req, res) => {
  try {
    const user = new Login(req.body);
    await user.register();
    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "You are registered and can now login");
    req.session.save(function () {
      return res.redirect("back");
    });
    return;
  } catch (err) {
    res.render("404");
  }
};
exports.login = async (req, res) => {
  try {
    const user = new Login(req.body);
    await user.login();
    if (user.errors.length > 0) {
      req.flash("errors", user.errors);
      req.session.save(function () {
        return res.redirect("back");
      });
      return;
    }

    req.session.user = user.user;
    req.flash("success", "You are logged in");

    req.session.save(function () {
      return res.redirect("/logged");
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};
exports.logout = (req, res) => {
  req.session.destroy(function () {
    return res.redirect("/login/index");
  });
};
