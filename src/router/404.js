const handler404 = (res) => {
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 Not Found \n");
  res.end('go404.index');
};

module.exports = handler404;
