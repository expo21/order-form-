const Options = require("../model/Options.model.js");
const StyleOption = require("../model/StyleOptions.model.js");

exports.getAllOptionList = async () => {
  try {
    let list = await Options.find({ deleted: false })
      .populate("style_option")
      .populate("garment_type");
    if (list.length > 0) {
      return list.map((item) => {
        return {
          _id: item._id,
          image: item.image,
          input_type: item.input_type,
          status: item.status,
          title: item.title,
          deleted: item.deleted,
          garment_type: item.garment_type.filter(
            (option) => option.deleted === false
          ),
          style_option:
            item.style_option.deleted === false ? item.style_option : "",
        };
      });
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

exports.addGarmentToOptions = async (objId, dataObj) => {
  try {
    let updatedObj = await Options.findByIdAndUpdate(objId, dataObj, {
      new: true,
    });
    if (updatedObj) return updatedObj;
    else return false;
  } catch (error) {
    return false;
  }
};

exports.removeGarmentFromOption = async (objId, dataObj) => {
  try {
    let updatedObj = await Options.updateOne(
      { _id: objId },
      { $pull: { garment_type: dataObj } }
    );
    if (updatedObj) return updatedObj;
    else return false;
  } catch (error) {
    return false;
  }
};
// delete option
exports.deleteOption = async (optionId) => {
  try {
    let updatedOption = await Options.updateOne(
      { _id: optionId },
      { $set: { deleted: true } }
    );
    return updatedOption;
  } catch (error) {
    console.log(error);
  }
};
