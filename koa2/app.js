const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const index = require('./routes/index')
const blog = require('./routes/blog')
const user = require('./routes/user')

// error handler
onerror(app)
app.use(
	// cors({
	// 	origin: '*', // 允许来自指定域名请求
	// 	maxAge: 5, // 本次预检请求的有效期，单位为秒。
	// 	methods: ['GET', 'POST'], // 所允许的HTTP请求方法
	// 	alloweHeaders: ['Conten-Type'], // 服务器支持的所有头信息字段
	// 	credentials: true, // 是否允许发送Cookie载请附上原文出处链接及本声明。
	// })
	cors()
)
// middlewares
app.use(
	bodyparser({
		enableTypes: ['json', 'form', 'text'],
	})
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(
	views(__dirname + '/views', {
		extension: 'pug',
	})
)

// logger
app.use(async (ctx, next) => {
	ctx.set(`Access-Control-Allow-Credentials`, true)
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.keys = ['_AreYou']
app.use(
	session({
		cookie: {
			path: '/',
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
		},
		store: redisStore({
			// all: '127.0.0.1:6379',
			all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`,
		}),
	})
)
// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
