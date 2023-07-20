const { login, loginTest } = require("../controller/user.js");
const { SuccessModel, ErrorModel } = require("../model/index.js");
const { path, query, proxyG } = require("../uilts/index.js");
const methodData = proxyG({
  "/api/user/login": (val, req) => login(req.body),
  "/api/user/login-test": (val, req) => loginTest(val, req),
});
const handlerUser = async (req, res) => {
	let data = await methodData[path(req)](query(req), req)
	req.createUserId()
	if (data === null) return null
	if (data) data = new SuccessModel(data, req)
	else data = new ErrorModel(data, req)
	return data
};

module.exports = handlerUser;
