module.exports = (app) => {
  const {
    createOrder,
    getAllOrder,
    getOrderByName,
    getOrderByOrderId,
  } = require("../controller/order.controller");

  // get data
  app.get("/order", (req, res) => {
    getAllOrder().then((result) => {
      res.send({ status: true, data: result });
    });
  });

  // post data
  app.post("/order", (req, res) => {
    console.log(req.body);
    createOrder(req.body)
      .then((result) => {
        res.send({ status: true, message: "Order Placed." });
      })
      .catch();
  });

  //get search data
  app.post("/orderByName", (req, res) => {
    getOrderByName(req.body.name)
      .then((result) => {
        res.send({ status: true, message: "", data: result });
      })
      .catch((error) => console.log(error));
  });

  //get order by order-id
  app.get("/orderByOrderId/:orderId", (req, res) => {
    getOrderByOrderId(req.params.orderId)
      .then((result) => {
        res.send({ status: true, message: "", data: result });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
