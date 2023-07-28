const router = require('koa-router')()
const { login, loginTest } = require('../controller/user.js')
const { ErrorModel, SuccessModel } = require('../model/index')
const jwt = require('jsonwebtoken')
const { AUTHORIZATION } = require('../conf/db.js')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
	const { username, password } = ctx.request.body
	if (!username || !password) {
		ctx.body = new ErrorModel('用户名或者密码不能为空')
		return
	}
	const data = await login(ctx.request.body)
	if (data.username) {
		// 生成验证token
		const token = jwt.sign(
			{
				username: data.username,
				id: data.id,
			},
			AUTHORIZATION.jwtSecret,
			{ expiresIn: AUTHORIZATION.tokenExpiresTime }
		)
		ctx.session.token = token
		data.token = token
		ctx.body = new SuccessModel(data)
		return
	}
	ctx.body = new ErrorModel('登录失败，请检查用户名或密码！')
})

module.exports = router
