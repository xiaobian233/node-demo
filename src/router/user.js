const { login } = require("../controller/user.js");
const { SuccessModel, ErrorModel } = require("../model/index.js");
const { path, query, proxyG } = require("../uilts/index.js");
const methodData = proxyG({
  "/api/user/login": (val, req) => login(req.body),
});
const handlerUser = async (req, res) => {
  try {
    let data = await methodData[path(req)](query(req), req);
    if (data === null) return null;
    if (data) data = new SuccessModel(data, req);
    else data = new ErrorModel(data, req);
    return data;
  } catch (e) {
    console.error(e);
    return false;
  }
};

module.exports = handlerUser;
