import { responder } from "./../util.js";

const getApiHealth = async (req, res) => {
  return responder({ res, success: true, message: "status OK" });
};

export { getApiHealth };
