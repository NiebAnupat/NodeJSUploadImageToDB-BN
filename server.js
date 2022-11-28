require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const uploadController = require("./src/controller/upload");
const readController = require("./src/controller/read");
const upload = require("./src/middleware/upload");

// const multer = require("multer");
// const upload = multer({ dest: "./assets/uploads" });

global.__basedir = __dirname;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", upload.single("image"), uploadController.uploadFiles);

app.use("/images", readController.getImages);

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Error", err);
  }
  console.log("Web server is now live. in port : ", PORT);
});
