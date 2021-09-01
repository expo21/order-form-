const Option = require("../model/Options.model");
const StyleOption = require("../model/StyleOptions.model");

const express = require("express");
const {
  getAllOptionList,
  addGarmentToOptions,
  removeGarmentFromOption,
  deleteOption,
} = require("../controller/options.controller");
const { upload } = require("../upload/upload");
const router = express.Router();
const webp = require("webp-converter");
webp.grant_permission();

//add option to the styles
router.post("/options/addOptions", upload.single("image"), async (req, res) => {
  try {
    let ImageFileName = req.file.location;
    // if (req.file.mimetype === "image/webp") {
    //   convertedFilename = uuidv4() + "-" + Date.now() + ".png";
    //   const result = await webp.dwebp(
    //     req.file.path,
    //     `./app/routes/uploads/${convertedFilename}`,
    //     "-o"
    //   );
    //   ImageFileName = convertedFilename;
    // }
    const newOption = new Option({
      title: req.body.title,
      input_type: req.body.input_type,
      garment_type: req.body.garment_type,
      style_option: req.body.style_option,
      status: 1,
      image: ImageFileName,
    });
    const savedOption = await newOption.save();
    if (savedOption) {
      let saveToStyle = await StyleOption.updateOne(
        { _id: req.body.style_option },
        { $push: { options: savedOption._id } }
      );
      if (saveToStyle) {
        res.send({ status: true, msg: "option added.", data: [] });
      }
    }
  } catch (error) {
    res.send({ status: false, msg: "Something went wrong.", data: [] });
  }
});

//get all options list
router.get("/options/optionsList", (req, res) => {
  getAllOptionList()
    .then((result) => {
      console.log({ result });
      if (result) {
        return res.send({ status: true, msg: "Options list.", data: result });
      }
      return res.send({ status: false, msg: "List not Found.", data: [] });
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

//add garment type to the options of style
router.post("/options/addGarmentToOptions/:id", (req, res) => {
  addGarmentToOptions(req.params.id, req.body)
    .then((result) => {
      if (result) {
        res.send({ status: true, msg: "update done.", data: [] });
      }
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

//remove garment type to the options of style
router.post("/options/removeGarmentFromOptions", (req, res) => {
  removeGarmentFromOption()
    .then((result) => {
      if (result) {
        res.send({ status: true, msg: "update done.", data: [] });
      }
    })
    .catch((error) => {
      return res.send({
        status: false,
        msg: "something went wrong.",
        data: [],
      });
    });
});

//delete option
router.get("/deleteOption/:optionId", (req, res) => {
  deleteOption(req.params.optionId)
    .then((result) => {
      if (result) {
        res.send({ status: true, message: "Option deleted." });
      } else {
        res.send({ status: false, message: "Something went wrong." });
      }
    })
    .catch((error) => {
      res.send({ status: false, message: "Something went wrong." });
    });
});

module.exports = router;
