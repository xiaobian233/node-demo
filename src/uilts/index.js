const querystring = require('querystring')

const typeOfs = val => toString.call(val)

const url = req => req.url

const path = req => req.url.split('?')[0]

const query = req =>
	(req.url.indexOf('?') > -1 && querystring.parse(req.url.split('?')[1])) ||
	null

const method = req => req.method

const isPost = req => method(req) === 'POST'

const postchunk = (req, callback) => {
	let buffers = []
	if (isPost(req)) {
		req.on('data', chunk => buffers.push(chunk))
		req.on('end', () => {
			req.body = querystring.parse(Buffer.concat(buffers).toString())
			callback(req.body, 'req.body')
		})
	} else callback()
}

const jsons = val => JSON.stringify(val)

const isPromise = val => toString.call(val) == '[object Promise]'

const proxyG = target => {
	return new Proxy(target, {
		get(target, key) {
			if (!(key in target)) return () => null
			return target[key]
		},
	})
}

module.exports = {
	url,
	path,
	query,
	method,
	isPost,
	postchunk,
	jsons,
	isPromise,
	proxyG,
}
