const fs = require('fs')
const path = require('path')
const { method, path: PP, url, query, jsons } = require('./index')

function createWriteStream(fileName) {
	const fullFillName = path.join(__dirname, `../../log/${fileName}.log`)
	const wirteStream = fs.createWriteStream(fullFillName, { flog: 'a' })
	return wirteStream
}

const accessWirteStream = createWriteStream('access')
const errorWirteStream = createWriteStream('error')
const eventWirteStream = createWriteStream('event')

function access(req, res) {
	let log = `method: ${method(req)}__url:${url(req)}__query:${query(req) && jsons(query(req))}__body:${res.body && jsons(res.body) || null}__path:${PP(req)}`
	accessWirteStream.write(log + '\n')
}

function error(log) {
	errorWirteStream.write(log + '\n')
}

function event(log) {
	eventWirteStream.write(log + '\n')
}

module.exports = {
	access,
	error,
	event,
}
