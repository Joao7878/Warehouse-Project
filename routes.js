const express = require("express");
const route = express.Router();
const homeController = require("./src/controllers/homeController");
const loginController = require("./src/controllers/loginController");
const materialController = require("./src/controllers/materialController");

//Rotas da Home
route.get("/", homeController.homePage);

//Rotas de login
route.get("/login/index", loginController.index);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);
route.get("/logged", loginController.index);
route.get("/login/logout", loginController.logout);
//Rotas de material
route.post("/logged/create", materialController.create);
route.get("/logged/delete/:id", materialController.delete);
route.get("/logged/update/:id", materialController.edit);
route.post("/logged/update/:id", materialController.update);

module.exports = route;
