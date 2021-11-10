const { readJson } = require("fs-extra");

const META_FOLDER_NAME = ".metaFolder";

async function extractMetaInfo(id) {
  let meta;
  try {
    meta = await readJson(getMetaFilePath(id));
  } catch (error) {
    // NOOP
  }

  return meta;
}

function getMetaFilePath(id) {
  const idParts = id.split("/");
  return (
    idParts.slice(0, -1).join("/") +
    "/" +
    META_FOLDER_NAME +
    "/" +
    idParts.slice(-1)[0] +
    ".json"
  );
}

module.exports = {
  extractMetaInfo,
};
