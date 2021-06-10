module.exports = (app) => {
  const {
    addDataToDatabase,
    getAllOrder,
  } = require("../controller/order.controller");

  app.get("/order", (req, res) => {
    getAllOrder().then((result) => {
      res.send({ status: true, data: result });
    });
  });
  app.post("/order", (req, res) => {
    addDataToDatabase().then((result) => {
      console.log("fs");
    });
  });
};
