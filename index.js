const express = require("express");
const app = express();
const port = 3001;
const cloudRoutes = require('./routes/cloudStorage');

app.use('/cloud', cloudRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
