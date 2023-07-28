const { ErrorModel } = require('../model/index')

module.exports = async (ctx, next) => {
	console.error(ctx.session, 'ctx.session', ctx.session.username);
	if (ctx.session.username) {
		await next()
		return
	}
	ctx.body = new ErrorModel('未登录')
}
