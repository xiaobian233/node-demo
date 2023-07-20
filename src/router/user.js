const { login, loginTest } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('../model/index.js')
const { path, query, proxyG } = require('../uilts/index.js')
const methodData = proxyG({
	'/api/user/login': (val, req) => login(req.body),
	'/api/user/login-test': (val, req) => loginTest(val, req),
})
const handlerUser = async (req, res) => {
	let data = await methodData[path(req)](query(req), req)
	if (data === null) return null
	if (data) data = new SuccessModel(data)
	else data = new ErrorModel(data)
	return data
}

handlerUser.has = path => Object.keys(methodData).includes(path)
module.exports = handlerUser
