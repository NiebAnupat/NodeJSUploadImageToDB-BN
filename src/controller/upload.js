const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadFiles = async (req, res) => {
  try {
    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    let imageFile = req.file;
    // console.log("imageFile", imageFile);

    await prisma.images
      .create({
        data: {
          filename: imageFile.originalname,
          data: fs.readFileSync(
            __basedir + "/assets/uploads/" + imageFile.filename
          ),
        },
      })
      .then((data) => {
        console.log("Upload successfully: ", data);
        fs.writeFileSync(
          __basedir + "/assets/temp/" + data.filename,
          data.data
        );
        console.log(
          "File saved to:",
          __basedir + "/assets/temp/" + data.filename
        );
        return res.status(200).send({
          message: "Uploaded the file successfully: " + imageFile.originalname,
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = {
  uploadFiles: uploadFiles,
};
