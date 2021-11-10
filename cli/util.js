const { extname } = require("path");
const { relative } = require("path");

const { extractMetaInfo } = require("./services/meta");
const { extractExif } = require("./services/exif");

const ALLOWED_EXTENSIONS = ["jpg", "jpeg"];

module.exports = {
  isExtensionSupported: function (id) {
    const ext = extname(id).slice(1).toLowerCase(); // remove dot
    return ALLOWED_EXTENSIONS.includes(ext);
  },
  processItem: async function (id) {
    const meta = await extractMetaInfo(id);
    const exif = await extractExif(id);

    return {
      id: relative(process.env.REPOSITORY_PATH, id),
      ...(meta || {}),
      ...(exif || {}),
    };
  },
};
