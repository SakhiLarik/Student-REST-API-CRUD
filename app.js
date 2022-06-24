const rout = require("./router/router");
const express = require("express");
const port = 3000;
const host = "127.0.0.1";
app = express();

rout.rout(app);

app.listen(port, host, () => {
  console.log(`App listening at http://${host}:${port}`);
});
