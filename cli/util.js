const { extname } = require("path");

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
const META_FOLDER_NAME = ".metaFolder";

module.exports = {
  isExtensionSupported: function (id) {
    const ext = extname(id).slice(1).toLowerCase(); // remove dot
    return ALLOWED_EXTENSIONS.includes(ext);
  },
  getMetaFilePath: function (id) {
    const idParts = id.split("/");
    return (
      idParts.slice(0, -1).join("/") +
      "/" +
      META_FOLDER_NAME +
      "/" +
      idParts.slice(-1)[0] +
      ".json"
    );
  },
  getExifData: require("util").promisify(require("exif").ExifImage),
};
