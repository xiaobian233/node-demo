const handers = [
	['Content-Type', 'application/json; charset=UTF-8'],
	['Content-Type', 'text/html; charset=utf-8'],
	['Accept', 'application/json; charset=UTF-8'],
]
const handlerDlog = require('./src/router/blog')
const handlerUser = require('./src/router/user')
const handler404 = require('./src/router/404')
const { jsons, postchunk, path } = require('./src/uilts')
const { USERHASLOGIN } = require('./src/uilts/userId')
const { access } = require('./src/uilts/log')
const serverHanlder = (req, res) => {
	handers.map(x => res.setHeader(...x))
	USERHASLOGIN(req, res)
	// 初始化值
	postchunk(req, async () => {
		access(req, res)
		let u = path(req)
		let end = null
		// blog
		if (handlerDlog.has(u)) {
			end = await handlerDlog(req, res)
			if (end) return res.end(jsons(end))
		}
		if (handlerUser.has(u)) {
			// user
			end = await handlerUser(req, res)
			if (end) return res.end(jsons(end))
		}
		// 404
		handler404(res)
	})
}

module.exports = serverHanlder
