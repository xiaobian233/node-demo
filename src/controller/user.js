const { exec } = require("../db/mysql");

const login = async (body) => {
  let { username, password } = body;
  let sql = ` select * from myBlog.user where username='${username}' and password='${password}' limit 1`;
  let data = await exec(sql);
  return (data && data[0]) || false;
};

module.exports = { login };
