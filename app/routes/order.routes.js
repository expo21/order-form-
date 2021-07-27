const { response } = require("express");
const express = require("express");
const { auth } = require("../auth/auth");
const router = express.Router();
const {
  createOrder,
  getAllOrder,
  getOrderByName,
  getOrderByOrderId,
  updateOrder,
} = require("../controller/order.controller");

// get data
router.get("/order", (req, res) => {
  getAllOrder().then((result) => {
    res.send({ status: true, data: result });
  });
});

// post data
router.post("/createOrder", (req, res) => {
  console.log(req.body);
  createOrder(req.body)
    .then((result) => {
      if (result) {
        res.send({ status: true, message: "Order Placed." });
      } else {
        res.send({ status: false, message: "order not placed" });
      }
    })
    .catch((error) => console.log(error));
});

//get search data
router.post("/orderByName", auth, (req, res) => {
  console.log("req.user ", req.user);
  // getOrderByName(req.body.name)
  //   .then((result) => {
  //     res.send({ status: true, message: "", data: result });
  //   })
  //   .catch((error) => console.log(error));
});

//get order by order-id
router.get("/orderByOrderId/:orderId", (req, res) => {
  getOrderByOrderId(req.params.orderId)
    .then((result) => {
      res.send({ status: true, message: "", data: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/updateOrder/:orderId", (req, res) => {
  updateOrder(req.params.orderId, req.body).then((response) => {
    res.send({ status: true, message: "order updated" });
  });
});

module.exports = router;
