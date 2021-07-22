const Garment = require("../model/garments.model");
const StyleOptions = require("../model/StyleOptions.model");
const Option = require("../model/Options.model.js");

exports.createGarmentOption = async (dataObj) => {
  try {
    let NewGarmentType = new Garment({
      title: dataObj.title,
      gender: dataObj.gender,
      image: dataObj.image,
      status: 1,
    });
    let savedObj = await NewGarmentType.save();
    return savedObj;
  } catch (error) {
    console.log(error);
  }
};

exports.garmetsByGender = async (gender) => {
  try {
    let garmentList = await Garment.find({ gender, status: 1 });
    if (garmentList.length > 0) {
      return garmentList;
    } else {
      return [];
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

exports.getAllGarments = async () => {
  try {
    let list = await Garment.find({ deleted: false });
    return list;
  } catch (error) {
    console.log(error);
  }
};

// //remove Garment
// exports.removeGarment = async (id) => {
//   try {
//     let updateItem = await Garment.findByIdAndUpdate(
//       { _id: id },
//       {
//         $set: {
//           status: 0,
//         },
//       },
//       { new: true }
//     );
//     console.log(updateItem);
//     let updateStyle = await StyleOptions.updateMany(
//       {
//         garment_type: updateItem._id,
//       },
//       {
//         $pull: { garment_type: updateItem._id },
//       }
//     );
//     if (updateStyle.ok === 1) {
//       let updateOption = await Option.updateMany(
//         { garment_type: updateItem._id },
//         {
//           $pull: {
//             garment_type: updateItem._id,
//           },
//         }
//       );
//       if (updateOption.ok === 1) {
//         return true;
//       } else return false;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     if (error) {
//       return false;
//     }
//   }
// };

// remove garment
exports.removeGarment = async (objId) => {
  try {
    let updatedItem = await Garment.updateOne(
      { _id: objId },
      {
        $set: {
          deleted: true,
        },
      }
    );
    console.log({ updatedItem });
    return updatedItem;
  } catch (error) {}
};
