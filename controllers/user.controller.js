const schema = require("../models/user.model"),
  bcrypt = require("bcrypt"),
  user = require("../models/user.model"),
  jwt = require("jsonwebtoken");

//!con esto no necesito trycath
require("express-async-errors");

exports.get = async (req, res) => {
  const datos = await schema.find();
  //! include --- await schema.find().populate('roles', {name:1});
  return res.status(200).json({
    data: datos,
  });
};

exports.getById = async (req, res, next) => {
  const data = await schema.findById(req.params.id);
  return res.status(200).json({
    data: data,
  });
};

exports.save = async (req, res, next) => {
  const data = await schema.create(
    new user({
      username: req.body.username,
      email: req.body.email,
      hash_password: bcrypt.hashSync(req.body.hash_password, 10),
    })
  );

  return res.status(200).json({
    message: "data added",
    data: data,
  });
};

exports.update = async (req, res, next) => {
  try {
    req.body.hash_password = bcrypt.hashSync(req.body.hash_password, 10);
    const data = await schema.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({
      message: "data update",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

exports.remove = async (req, res, next) => {
  try {
    const data = await schema.findByIdAndDelete(req.params.id, req.body);
    return res.status(200).json({
      message: "data removed",
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
