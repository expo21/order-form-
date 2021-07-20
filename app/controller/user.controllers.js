const User = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (userObj) => {
  try {
    let user = new User(userObj);
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(userObj.password, salt);

    user.password = hash;
    let savedUser = await user.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign(
      { id: savedUser._id, userType: savedUser.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    return {
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
      },
    };
  } catch (error) {
    if (error) {
      return error.message;
    }
  }
};

exports.login = async (dataObj, user) => {
  const { password } = dataObj;

  try {
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) throw Error("Invalid credentials");
    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    return error.message;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    let user = await User.findOne({ email });
    if (user) return user;
    return false;
  } catch (error) {}
};
