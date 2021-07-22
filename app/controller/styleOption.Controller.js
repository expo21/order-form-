const StyleOption = require("../model/StyleOptions.model");
const GarmentType = require("../model/garments.model");
const Options = require("../model/Options.model");

exports.getAllStyleOptions = async () => {
  try {
    let list = await StyleOption.find({ deleted: false })
      .populate("options")
      .populate("garment_type");
    console.log(list);
    if (list.length > 0) {
      return list;
    }
  } catch (error) {
    console.log(error);
  }
};

// exports.getAllStyleOptions = async () => {
//   try {
//     let list = await StyleOption.aggregate([
//       { $match: { deleted: false } },
//       {
//         $lookup: {
//           from: "Options",

//           pipeline: [{ $match: { $expr: { deleted: false } } }],
//           as: "Options",
//         },
//       },
//       {
//         $lookup: {
//           from: "Garment_Type",
//           let: { style_id: "$garment_type" },
//           pipeline: [
//             {
//               $match: {
//                 $expr: {
//                   $and: [
//                     {$eq : []}
//                   ]
//                 },
//               },
//             },
//           ],
//           as: "Garment_Type",
//         },
//       },
//     ]);
//     console.log({ liststs: list });
//     return list;
//   } catch (error) {
//     console.log(error);
//   }
// };

//getStyleOptionByGarmentAndGender
exports.getStyleOptionByGarmentAndGender = async (garment, gender) => {
  try {
    let garment_id = await GarmentType.findOne(
      {
        $and: [{ title: garment }, { gender: gender }],
        status: 1,
      },
      { _id: 1 }
    );
    let garmentId = garment_id._id;

    let styleOptions = await StyleOption.find(
      {
        garment_type: garmentId,
        status: 1,
      },
      {
        options: 1,
        title: 1,
        custom: 1,
      }
    ).populate("options");

    console.log(styleOptions);
    return styleOptions;
  } catch (error) {
    console.log(error);
  }
};

///

exports.updateStyleOption = async (objId, dataObj) => {
  try {
    let updatedOption = await StyleOption.findByIdAndUpdate(objId, dataObj, {
      new: true,
    });
    if (updatedOption) {
      return updatedOption;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

///
exports.disbaleStyleOption = async (objId, dataObj) => {
  try {
    dataObj.status = 0;
    let disableOption = await StyleOption.findByIdAndUpdate(objId, dataObj, {
      new: true,
    });
    if (disableOption) {
      return disableOption;
    }
  } catch (err) {
    console.log(err);
  }
};

//
exports.addGramentToStyleOption = async (optionId, garment_type) => {
  console.log(optionId, garment_type);
  try {
    let updatedOption = await StyleOption.updateOne(
      { _id: optionId },
      { $push: { garment_type: garment_type } },
      { new: true }
    );
    console.log(updatedOption);
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};

exports.updateStyleOption = async (id, obj) => {
  let option = {
    title: obj.title,
    garment_type: obj.garment_types,
    custom: obj.custom,
    status: obj.status,
    options: obj.options.map((x) => x._id),
  };
  try {
    let updatedOption = await StyleOption.updateOne({ _id: id }, option, {
      new: true,
    });
    console.log({ updatedOption });
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};
