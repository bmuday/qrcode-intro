const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const qrcode = require("qrcode");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// routes

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/scan", (req, res) => {
  const { url } = req.body;

  if (url.length === 0) {
    res.send("Please enter valid URL");
  } else {
    qrcode
      .toDataURL(url)
      .then((data) => {
        res.render("scan", { data });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
