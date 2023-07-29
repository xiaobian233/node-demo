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

app.keys = ['SESSION_ID']
app.use(
	session({
		key: 'SESSION_ID',
		cookie: {
			maxAge: 24 * 60 * 60 * 1000,
			path: '/',
			// domain: 'http://127.0.0.1',
			httpOnly: true,
			overwrite: false,
			sameSite: 'none',
		},
		store: redisStore({
			// all: '127.0.0.1:6379',
			all: `${REDIS_CONF.host}:${REDIS_CONF.prot}`,
		}),
	})
)
app.use(
	cors({
		origin: function () {
			return 'http://127.0.0.1:8000'
		},
		credentials: true,
		exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
		maxAge: 5,
		credentials: true,
		allowMethods: ['GET', 'POST', 'DELETE'],
		allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
	})
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
	ctx.cookies.set('sameSite', 'none', { secure: false })
	const start = new Date()
	await next()
	const ms = new Date() - start
	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx)
})

module.exports = app
