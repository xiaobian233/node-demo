const handers = [
  ["Content-Type", "application/json; charset=UTF-8"],
  ["Content-Type", "text/html; charset=utf-8"],
  ["Accept", "application/json; charset=UTF-8"],
];
const handlerDlog = require("./src/router/blog");
const handlerUser = require("./src/router/user");
const handler404 = require("./src/router/404");
const { jsons, postchunk } = require("./src/uilts");

const serverHanlder = (req, res) => {
  postchunk(req, async () => {
    handers.map((x) => res.setHeader(...x));
    let end = null;
    // blog
    end = await handlerDlog(req, res);
    if (end) return res.end(jsons(end));
    // user
    end = await handlerUser(req, res);
    if (end) return res.end(jsons(end));
    // 404
    handler404(res);
  });
};

module.exports = serverHanlder;
