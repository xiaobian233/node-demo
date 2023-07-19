const env = process.env.NODE_ENV;
let MYSQL_CONF = {
  host: "localhost",
  user: "root",
  password: "root1234",
  port: "3306",
  database: "myBlog",
};

if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root1234",
    port: "3306",
    database: "myBlog",
  };
}

if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    user: "root",
    password: "root1234",
    port: "3306",
    database: "myBlog",
  };
}

module.exports = {
  MYSQL_CONF,
};
