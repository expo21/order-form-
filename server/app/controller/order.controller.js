const Order = require("../model/order.model");
const Counter = require("../model/counter.model");

const getNextSequenceValue = async (queryString) => {
  let sequence_doc = await Counter.findOneAndUpdate(
    { _id: queryString },
    { $inc: { sequence_value: 1 } },
    { new: true }
  );
  return sequence_doc.sequence_value;
};

exports.createOrder = async (obj) => {
  try {
    let newOrder = Order({
      order_number: await getNextSequenceValue("productid"),
      // email: obj.step_1.email,
      // address: obj.step_1.address,
      // tel: obj.step_1.tel,
      // gender: obj.step_1.gender,
      // garment_type: obj.step_2.garment_type,
      // choose_style: obj.step_3.choose_style,
      // fabric: obj.step_3.fabric,
      // fitting: obj.step_3.fitting,
      // custom: obj.step_3.custom,
      // measurements: obj.step_4,
    });
    console.log(newOrder);
    let savedOrder = await newOrder.save();
    console.log(savedOrder);
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderByName = async (obj) => {
  try {
    let searchResult = await Order.find({ $text: { $search: obj } });
    console.log(searchResult);
    if (searchResult) {
      return searchResult;
    }
  } catch (error) {
    console.log(error);
  }
};

//get order by order id
exports.getOrderByOrderId = async (orderId) => {
  try {
    let order = await Order.findOne({ order_number: orderId });
    console.log(order);
    if (order) {
      return order;
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrder = async () => {
  try {
    getNextSequenceValue("productid");
    let orders = await Order.find();
    return orders;
  } catch (error) {}
};
