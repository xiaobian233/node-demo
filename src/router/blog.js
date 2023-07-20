const {
	getList,
	getDetail,
	newBlog,
	deleteID,
	uploadBlog,
} = require('../controller/blog.js')
const { SuccessModel, ErrorModel } = require('../model/index.js')
const { path, query, proxyG } = require('../uilts/index.js')
const { USERHAS } = require('../uilts/userId.js')
const methodData = proxyG({
	'/api/blog/list': val => getList(val.author, val.keyword),
	'/api/blog/detail': val => getDetail(val.id),
	'/api/blog/new': (val, req) => newBlog(req.body, val.id),
	'/api/blog/upload': (val, req) => uploadBlog(req.body, val.id),
	'/api/blog/delete': val => deleteID(val.id, val.author),
})
const handlerDlog = async (req, res) => {
	if (!USERHAS(req)) return USERHAS.msg
	let data = await methodData[path(req)](query(req), req)
	if (data === null) return null
	if (data) data = new SuccessModel(data)
	else data = new ErrorModel(data)
	return data
}
handlerDlog.has = path => Object.keys(methodData).includes(path)
module.exports = handlerDlog
