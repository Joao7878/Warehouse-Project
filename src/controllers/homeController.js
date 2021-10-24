const Materials = require("../models/materialsModel");
exports.homePage = async (req, res) => {
  if (req.session.user) {
    const material = new Materials(req.body, req.session.user._id);
    const materials = await material.search();
    return res.render("logged", { materials });
  }
  res.render("index");
};
