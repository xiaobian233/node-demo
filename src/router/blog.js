const {
  getList,
  getDetail,
  newBlog,
  deleteID,
  uploadBlog,
} = require("../controller/blog.js");
const { SuccessModel, ErrorModel } = require("../model/index.js");
const { path, query, proxyG } = require("../uilts/index.js");
const methodData = proxyG({
  "/api/blog/list": (val) => getList(val.author, val.keyword),
  "/api/blog/detail": (val) => getDetail(val.id),
  "/api/blog/new": (val, req) => newBlog(req.body, val.id),
  "/api/blog/upload": (val, req) => uploadBlog(req.body, val.id),
  "/api/blog/delete": (val) => deleteID(val.id, val.author),
});
const handlerDlog = async (req, res) => {
  let data = await methodData[path(req)](query(req), req);
  if (data === null) return null;
  if (data) data = new SuccessModel(data, req);
  else data = new ErrorModel(data, req);
  return data;
};

module.exports = handlerDlog;
