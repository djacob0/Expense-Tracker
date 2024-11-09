import { responder } from "./../util.js";
import User from "../models/User.js";

const postApiSignups = async (req, res) => {
  const { userName, email, password, bankName, contactNumber, address } =
    req.body;

  const user = new User({
    userName,
    email,
    password,
    bankName,
    contactNumber,
    address,
  });

  try {
    const saveUserData = await user.save();
    return responder({
      res,
      success: true,
      data: saveUserData,
      message: "User data save Successfully.",
    });
  } catch (err) {
    return responder({ res, success: false, message: err.message });
  }
};

const getApiSignups = async (req, res) => {
  const { id } = req.params;

  const fetchUser = await User.findOne({ _id: id });
  return responder({
    res,
    success: true,
    data: fetchUser,
    message: "Fetch user details by Id."
  })
}

const postApiLogins = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return responder({
      res,
      success: false,
      message: 'Please provide correct email and password.'
    })
  }
  try {
    const loginUser = await User.findOne({ email, password }).select("userName email password");
    if (loginUser) {
      return responder({
        res,
        success: true,
        data: loginUser,
        message: "You have Logined Successfully."
      })
    }
    else {
      return responder({
        res,
        success: false,
        message: "Invalid Email or Password"
      })
    }
  } catch (err) {
    return responder({
      res,
      success: false,
      message: err.message
    })
  }
}

export { postApiSignups, getApiSignups, postApiLogins };
