const { get, set, del } = require('../db/redis')
const { ErrorModel } = require('../model')

const newUserId = () => `${Date.now()}_${Math.random()}`

const getCookie = req => {
	if (!req.headers.cookie) return null
	let cookie = {}
	const cookieStr = req.headers.cookie || ''
	cookieStr.split(';').forEach(item => {
		if (!item) return
		const arr = item.split('=')
		cookie[arr[0].trim()] = arr[1].trim()
	})
	return cookie
}

const resetCookie = (req, res) => res.setHeader('Set-Cookie', '')

const setCookie = (req, res, userId) => {
	const getCookieDate = (time = 24 * 60 * 60 * 1000) => {
		const d = new Date()
		d.setTime(d.getTime() + time)
		return d.toGMTString()
	}
	res.setHeader(
		'Set-Cookie',
		`userId=${userId}; path=/; httpOnly; expires=${getCookieDate()}`
	)
}

// 登录cookie添加操作
const USERHASLOGIN = async (req, res) => {
	let cookie = getCookie(req)
	let add = () => {
		resetCookie(req, res)
		req.checkUserId = function (user = {}) {
			let userIDD = newUserId()
			set(userIDD, user)
			setCookie(req, res, userIDD)
		}
		req.error = -1
		req.errorMsg = `暂无权限, 请重新登录`
	}
	if (!cookie) {
		add()
		return
	} else {
		let { userId } = cookie
		if (userId) {
			let user = await get(userId)
			let userId2 = newUserId()
			set(userId2, user)
			del(userId)
			setCookie(req, res, userId2)
			return
		} else {
			add()
		}
	}
}

function USERHAS(req) {
	USERHAS.USERHASREQ = req
	if (req.error === -1) return null
}

Object.defineProperty(USERHAS, 'msg', {
	get: () => {
		return new ErrorModel(USERHAS.USERHASREQ.errorMsg)
	},
})

module.exports = {
	setCookie,
	resetCookie,
	getCookie,
	USERHASLOGIN,
	USERHAS,
}
