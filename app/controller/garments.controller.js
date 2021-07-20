const Garment = require("../model/garments.model");
const StyleOptions = require("../model/StyleOptions.model");

exports.createGarmentOption = async (dataObj) => {
  try {
    let NewGarmentType = new Garment({
      title: dataObj.title,
      gender: dataObj.gender,
      image: dataObj.image,
      status: 1,
    });
    let savedObj = await NewGarmentType.save();
    console.log(savedObj);
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
    let list = await Garment.find({});
    return list;
  } catch (error) {
    console.log(error);
  }
};

//remove Garment
exports.removeGarment = async (id) => {
  console.log(id);
  try {
    let removedItem = await Garment.findByIdAndRemove({ _id: id });
    let getStyle = await StyleOptions.findOne({ garment_type: id });

    console.log(getStyle.garment_type);
    console.log(getStyle.garment_type.filter((x) => x === id));
    let newGarmentTypes = getStyle.garment_type.filter((x) => x === id);
    let updateStyle = await StyleOptions.findOneAndUpdate(
      { garment_type: id },
      { $set: { garment_type: newGarmentTypes } }
    );
    console.log(updateStyle);
    return updatedStyle;
  } catch (error) {}
};
