const Order = require("../model/order.model");

exports.addDataToDatabase = async () => {
  try {
    let newOrder = Order({
      title: "title 1",
      description: "this is fgkjgke fd ",
    });
    let savedOrder = await newOrder.save();
    console.log(savedOrder);
  } catch (error) {}
};

exports.getAllOrder = async () => {
  try {
    let orders = await Order.find();
    return orders;
  } catch (error) {}
};
