const Materials = require("../models/materialsModel");
exports.create = async (req, res) => {
  try {
    const material = new Materials(req.body, req.session.user._id);
    await material.create();
    if (material.errors.length > 0) {
      req.flash("errors", material.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "Material created successfully");
    req.session.save(() => {
      return res.redirect("back");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const material = new Materials(req.body, req.session.user._id);
    const deletedMaterial = await material.delete(req.params.id);
    if (deletedMaterial == null) {
      req.flash("errors", "Error: material stay in the warehouse");
      req.session.save(() => res.redirect("back"));
      return;
    }
    req.flash("success", "Material deleted successfully");
    req.session.save(() => {
      return res.redirect("back");
    });
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};
exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const param = new Materials(req.body, req.session.user._id);
    const material = await param.searchId(req.params.id);
    res.render("update", { material });
  } catch (error) {
    return res.render("404");
  }
};
exports.update = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const material = new Materials(req.body, req.session.user._id);
    await material.edit(req.params.id);
    if (material.errors.length > 0) {
      console.log(material.errors);
      req.flash("errors", material.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "Material updated successfully");
    req.session.save(() => {
      return res.redirect("/logged");
    });
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};
