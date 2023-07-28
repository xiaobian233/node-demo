const router = require('koa-router')()
const { getList } = require('../controller/blog')
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
	const r = await getList(ctx.query.author, ctx.query.keyword)
	ctx.body = r
})

router.get('/detail', async (ctx, next) => {
	ctx.body = '未开发'
})

router.post('/new', async (ctx, next) => {
	ctx.body = '未开发'
})

router.post('/upload', async (ctx, next) => {
	ctx.body = '未开发'
})

router.get('/delete', async (ctx, next) => {
	ctx.body = '未开发'
})

module.exports = router
