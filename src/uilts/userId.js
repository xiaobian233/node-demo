let userIdMap = new Map()
let userId = () => `${Date.now()}_${Math.random()}`
const setUserId = (req, res) => {
	req.session = { userId: userId() }
	userIdMap.set(req.session.userId, true)
	return req.session.userId
}

const getUserId = req => req.session.userId

const setCookie = (req, res) => {
	const getCookieDate = (time = 24 * 60 * 60 * 1000) => {
		const d = new Date()
		d.setTime(d.getTime() + time)
		return d.toGMTString()
	}
	let userId = setUserId(req)
	res.setHeader(
		'Set-Cookie',
		`userId=${userId}; path=/; httpOnly; expires=${getCookieDate()}`
	)
}

const resetCookie = (req, res) => res.setHeader('Set-Cookie', '')

const getCookie = req => req.cookie

const getCookieUserId = req => getCookie(req)?.userId || null

// 登录cookie添加操作
const USERHASLOGIN = (req, res) => {
	let userId = getCookieUserId(req)
	if (!userId) {
		resetCookie(req, res)
		req.createUserId = () => setCookie(req, res)
	} else if (userIdMap.has(userId)) {
		userIdMap.delete(userId)
		setCookie(req, res)
	}
}

module.exports = {
	setUserId,
	getUserId,
	setCookie,
	resetCookie,
	getCookie,
	getCookieUserId,
	USERHASLOGIN,
}
