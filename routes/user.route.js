//? rutas
const express = require("express"),
  userRoute = express.Router(),
  controller = require("../controllers/user.controller");

userRoute.post("/create", controller.save);
userRoute.get("/read", controller.get);
userRoute.put("/update/:id", controller.update);
userRoute.delete("/delete/:id", controller.remove);

userRoute.get("/read/:id", controller.getById);

module.exports = userRoute;
