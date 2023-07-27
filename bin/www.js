const serverHanlder = require('../app')
const http = require('http')
const servers = http.createServer(serverHanlder)
servers.listen(8080, () => {
	console.error(`
        Start Serve: 
        prot: 8080,
        go home: http://localhost:8080/
    `)
})
