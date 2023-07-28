const { ErrorModel, LoginFailure } = require('../model/index')
const verify = require('../utils/verify')
const { AUTHORIZATION } = require('../conf/db')
const { userInfo } = require('../controller/user')
module.exports = async (ctx, next) => {
	const token = ctx.header.authorization
	if (token !== null && token) {
		try {
			let payload = await verify(token, AUTHORIZATION.jwtSecret)
			if (payload) {
				let user = await userInfo(payload.id)
				if (!!user) {
					const userData = {
						name: payload.username,
						id: payload.id,
					}
					ctx.state.user = userData
				}
			}
		} catch (err) {
			ctx.body = new LoginFailure('认证失效，请重新登录')
			return
		}
	} else {
		ctx.body = new ErrorModel('token不能为空')
		return
	}
	await next()
}
