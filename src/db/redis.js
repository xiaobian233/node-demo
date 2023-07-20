const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.host)
redisClient.on('error', error => {
	console.error('redis Error:' + error)
})

function set(key, val) {
	if (typeof val === 'object') val = JSON.stringify(val)
	redisClient.set(key, val)
}

function get() {
	return new Promise((res, rej) => {
		redisClient.get(key, (err, val) => {
			if (err) return rej(err)
			if (val === null) return res(val)
			try {
				res(JSON.parse(val))
			} catch (e) {
				res(val)
			}
		})
	})
}

module.exports = {
	get,
	set,
}
