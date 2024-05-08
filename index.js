const express = require("express");
const app = express();
const user = require("./router/user.router");

const port = 3000;

app.use(express.json());

app.use("/user", user);

app.get("/", (req, res) => {
  res.send("<html><body><h1>hello world</h1></body></html>");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
