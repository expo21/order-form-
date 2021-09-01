const StyleOption = require("../model/StyleOptions.model");
const GarmentType = require("../model/garments.model");
const Options = require("../model/Options.model");

exports.getAllStyleOptions = async () => {
  try {
    let list = await StyleOption.find({ deleted: false })
      .populate("options")
      .populate("garment_type");
    if (list.length > 0) {
      return list.map((item) => {
        return {
          _id: item._id,
          options: item.options.filter((option) => option.deleted === false),
          deleted: item.deleted,
          title: item.title,
          custom: item.custom,
          status: item.status,
          garment_type: item.garment_type.filter(
            (option) => option.deleted === false
          ),
        };
      });
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
    // let garment_id = await GarmentType.findOne(
    //   {
    //     $and: [{ title: garment }, { gender: gender }],
    //     status: 1,
    //   },
    //   { _id: 1 }
    // );
    // let garmentId = garment_id._id;

    // let styleOptions = await StyleOption.find(
    //   {
    //     garment_type: garment,
    //     status: 1,
    //   },
    //   {
    //     options: 1,
    //     title: 1,
    //     custom: 1,
    //   }
    // ).populate("options");

    let garmentId = await GarmentType.find(
      { title: garment, deleted: false },
      { _id: 1 }
    );

    // let styleOptions = await StyleOption.aggregate([
    //   { $match: { garment_type: { $all: [garmentId[0].id] } } },
    // ]);
    let styleOptions = await StyleOption.find({
      garment_type: garmentId[0].id,
      deleted: false,
    }).populate("options");

    // let newas = styleOptions.map((x) => {
    //   return x.options
    //     .map((y) => {
    //       if (y.garment_type.includes(garmentId[0].id) && y.deleted === false) {
    //         return y;
    //       }
    //     })
    //     .filter(function (el) {
    //       return el != null;
    //     });
    // });

    return styleOptions.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        custom: item.custom,
        options: item.options
          ?.map((y) => {
            if (
              y.garment_type.includes(garmentId[0].id) &&
              y.deleted === false
            ) {
              return y;
            }
          })
          .filter(function (el) {
            return el != null;
          }),
      };
    });
  } catch (error) {
    console.log(error);
  }
};

//

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

//
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
  try {
    let updatedOption = await StyleOption.updateOne(
      { _id: optionId },
      { $push: { garment_type: garment_type } },
      { new: true }
    );
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
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteStyle = async (optionId) => {
  try {
    let updatedOption = await StyleOption.updateOne(
      { _id: optionId },
      { $set: { deleted: true } }
    );
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};
