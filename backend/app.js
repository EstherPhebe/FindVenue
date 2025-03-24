const express = require("express");
const app = express();

const port = 3007;
app.use(express.json());

app.get("/test", (req, res) => {
  return res.status(200).json({ msg: "Working fine" });
});

app.listen(port, () => {
  console.log(`listening on port ${port} - ${Date()}`);
});
