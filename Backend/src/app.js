const express = require("express");
const { port } = require("./configs/dotenv.config");
const cors = require("cors");
require("./configs/database.config");
const mainRouter = require("./routers/main.router");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.write("Notes App");
  res.end();
});

app.use("/api", mainRouter);

app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
