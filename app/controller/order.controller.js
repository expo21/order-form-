const Order = require("../model/order.model");
const Counter = require("../model/counter.model");

//get counter
const getNextSequenceValue = async (queryString) => {
  try {
    let sequence_doc = await Counter.updateOne(
      { _id: queryString },
      { $inc: { sequence_value: 1 } },
      { new: true }
    );
    if (sequence_doc.ok === 1) {
      let doc = await Counter.findOne({ _id: queryString });
      return doc.sequence_value;
    }
    // return sequence_doc.sequence_value;
  } catch (error) {
    console.log(error);
  }
};

//create order
exports.createOrder = async (obj) => {
  try {
    let order_id = await getNextSequenceValue("productid");
    console.log(order_id);
    let newOrder = new Order({
      order_number: order_id,
      name: obj.step_1.name,
      email: obj.step_1.email,
      address: obj.step_1.address,
      tel: obj.step_1.tel,
      gender: obj.step_1.gender,
      garment_type: obj.step_2.garment_type,
      garment_style: obj.step_3.garment_style,
      ready_style_number: obj.ready_style_number,
      custom: obj.custom,
      ready_made: obj.ready_made,
      measurements: obj.step_4,
    });

    let savedOrder = await newOrder.save();
    console.log(savedOrder);

    return savedOrder;
  } catch (error) {
    return error.message;
  }
};

//get order by name
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

    if (order) {
      return {
        step_1: {
          name: order.name,
          email: order.email,
          address: order.address,
          tel: order.tel,
          gender: order.gender,
          order_number: order.order_number,
        },
        step_2: { garment_type: order.garment_type },
        step_3: {
          garment_style: order.garment_style,
        },
        step_4: order.measurements || {},
        ready_made: order.ready_made,
        ready_style_number: order.ready_style_number,
        custom: order.custom,
        booking: order.booking,
        status: order.status,
      };
    }
  } catch (error) {
    console.log(error);
  }
};

//get all orders

exports.getAllOrder = async () => {
  try {
    let orders = await Order.find({}, { updatedAt: 0, __v: 0 });
    console.log(orders);
    let arr = orders.map((obj) => {
      return {
        // _id: obj._id,
        order_number: obj.order_number,
        name: obj.name,
        email: obj.email,
        address: obj.address,
        tel: obj.tel,
        gender: obj.gender,
        garment_type: obj.garment_type,
        garment_style: obj.garment_style,
        ready_made: obj.ready_made,
        custom: obj.custom,
        measurements: obj.measurements,
        booking: obj.booking,
        status: obj.status,
      };
    });
    console.log({ arr });
    return arr;
  } catch (error) {}
};

//update order
exports.updateOrder = async (id, obj) => {
  try {
    let order = await Order.updateOne(
      { order_number: id },
      {
        order_number: obj.step_1.order_number,
        name: obj.step_1.name,
        email: obj.step_1.email,
        address: obj.step_1.address,
        tel: obj.step_1.tel,
        gender: obj.step_1.gender,
        garment_type: obj.step_2.garment_type,
        garment_style: obj.step_3.garment_style,
        ready_made: obj.ready_made,
        ready_style_number: obj.ready_style_number,
        custom: obj.custom,
        measurements: obj.step_4,
        booking: obj.booking,
        status: obj.status,
      },
      { new: true }
    );
    console.log(order);
    return order;
  } catch (error) {
    console.log(error);
  }
};
