const serverHanlder = require("../app");
const http = require("http");
const servers = http.createServer(serverHanlder);
servers.listen(8080);
