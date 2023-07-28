const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
	let { username, password } = ctx.request.body
	console.error(ctx)
	ctx.body = {
		error: 0,
		username,
		password,
	}
})

router.get('/session', async (ctx, next) => {
	if (ctx.session.viewCount == null) {
		ctx.session.viewCount = 0
	}
	ctx.session.viewCount++
	ctx.body = {
		error: 0,
		viewCount: ctx.session.viewCount,
	}
})

module.exports = router
