const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getImages = async (req, res) => {
  try {
    console.log("get all images...");
    const images = await prisma.images.findMany();
    console.log("send all images...");
    res.status(200).json(images);
    console.log("send all images...done");
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Could not get images. ${err}`,
    });
  }
};

module.exports = {
  getImages: getImages,
};
