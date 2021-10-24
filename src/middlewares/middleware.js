exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.success = req.flash("success");
  res.locals.info = req.flash("info");
  res.locals.user = req.session.user;
  next();
};
exports.checkCSRFError = (err, req, res, next) => {
  if (err) {
    console.log(err);
    return res.render("404");
  }
  next();
};
exports.CSRFMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
