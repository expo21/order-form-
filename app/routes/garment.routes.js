const express = require("express");
const {
  createGarmentOption,
  garmetsByGender,
  getAllGarments,
  removeGarment,
} = require("../controller/garments.controller");
const multer = require("multer");

const webp = require("webp-converter");
webp.grant_permission();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "app/routes/uploads");
  },
  filename: function (req, file, cb) {
    let filename =
      uuidv4() + "-" + Date.now() + path.extname(file.originalname);

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

//create
router.post("/garmentType", upload.single("image"), async (req, res) => {
  let ImageFileName = req.file.filename;
  if (req.file.mimetype === "image/webp") {
    ImageFileName = uuidv4() + "-" + Date.now() + ".png";
    await webp.dwebp(
      req.file.path,
      `./app/routes/uploads/${ImageFileName}`,
      "-o"
    );
    // ImageFileName = convertedFilename
  }

  let dataObj = {
    title: req.body.title,
    gender: req.body.gender,
    image: ImageFileName,
    deleted: false,
  };

  createGarmentOption(dataObj)
    .then((result) => {
      if (!result)
        res.send({ status: false, msg: "Something went wrong.", data: [] });
      res.send({ status: true, msg: "New garment type is added. ", data: [] });
    })
    .catch((error) => {
      res.send({ status: false, msg: error.message });
    });
});

//get garments type by gender
router.get("/garmentsByGender/:gender", (req, res) => {
  garmetsByGender(req.params.gender)
    .then((result) => {
      if (result.length > 0) {
        return res.send({ status: true, message: "List found ", data: result });
      } else {
        return res.send({
          status: false,
          message: "List not found ",
          data: [],
        });
      }
    })
    .catch();
});

//all garment types
router.get("/allGarments", (req, res) => {
  getAllGarments()
    .then((result) => {
      if (result.length > 0) {
        res.send({ status: true, msg: "List found", data: result });
      } else {
        res.send({ status: false, msg: "No Garments Found.", data: [] });
      }
    })
    .catch((error) => {
      res.send({ status: false, msg: "something went wrong.", data: [] });
    });
});

//delete garment
router.get("/deleteGarment/:id", (req, res) => {
  removeGarment(req.params.id)
    .then((result) => {
      if (result) {
        res.send({ status: true, message: "Item deleted.", data: result });
      } else {
        res.send({ status: false, message: "something went wrong." });
      }
    })
    .catch((err) => {
      if (err) {
        res.send({ status: false, message: "something went wrong." });
      }
    });
});

module.exports = router;
