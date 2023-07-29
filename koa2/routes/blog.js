const router = require('koa-router')()
const { getList, getDetail, newBlog, deleteID } = require('../controller/blog')
const { ErrorModel, SuccessModel } = require('../model/index')
const loginCheck = require('../middleware/loginCheck')
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
	let keyword = ctx.query.keyword
	let author = ctx.query.author
	if (ctx.query.isadmin) {
		if (ctx.session.username == null) {
			ctx.body = new ErrorModel('未登录')
		}
		author = ctx.session.username
	}
	const r = await getList(author, keyword)
	ctx.body = new SuccessModel(r)
})

router.get('/detail', async (ctx, next) => {
	let data = await getDetail(ctx.query.id)
	ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async (ctx, next) => {
	const body = ctx.request.body
	const data = await newBlog(body)
	ctx.body = new SuccessModel(data)
})

router.post('/upload', loginCheck, async (ctx, next) => {
	const body = ctx.request.body
	const val = await uploadBlog(body)
	if (!val) return (ctx.body = new ErrorModel('更新失败'))
	ctx.body = new SuccessModel(val)
})

router.get('/delete', loginCheck, async (ctx, next) => {
	const val = await deleteID(ctx.query.id, ctx.query.author)
	if (!val) return (ctx.body = new ErrorModel('删除失败'))
	ctx.body = new SuccessModel(val)
})

module.exports = router
