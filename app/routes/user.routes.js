const express = require("express");
const {
  register,
  findUserByEmail,
  login,
} = require("../controller/user.controllers");

const router = express.Router();

router.post("/register", async (req, res) => {
  if (await findUserByEmail(req.body.email)) {
    res.send({ status: false, message: "Email already exists.", data: [] });
  } else {
    register(req.body)
      .then((result) => {
        if (!result.token) res.send({ status: false, msg: result, data: [] });
        res.send({ status: true, msg: "User registered.", data: result });
      })
      .catch((err) => {
        res.send({ status: false, msg: "Something went wrong.", data: [] });
      });
  }
});

router.post("/login", async (req, res) => {
  let user = await findUserByEmail(req.body.email);
  if (!user)
    return res.send({
      status: false,
      msg: "User not registered with this email.",
      data: [],
    });

  login(req.body, user)
    .then((result) => {
      console.log(result);
      if (result.token) {
        res.send({ status: true, msg: "User loged in.", data: result });
      } else {
        res.send({ status: false, msg: result, data: [] });
      }
    })
    .catch((error) => {
      res.send({ status: false, msg: "Something went wrong.", data: [] });
    });
});

module.exports = router;
