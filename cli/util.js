const { extname } = require("path");
const { relative } = require("path");
const { readFile } = require("fs/promises");
const { readJson } = require("fs-extra");
const getExifData = require("util").promisify(require("exif").ExifImage);

const ALLOWED_EXTENSIONS = ["jpg", "jpeg"];
const META_FOLDER_NAME = ".metaFolder";
const repositoryPath = process.env.REPOSITORY_PATH;

async function extractMetaInfo(id) {
  return readJson(getMetaFilePath(id));
}

async function extractExif(id) {
  const fileBuffer = await readFile(id);

  try {
    const {
      gps,
      image: { Orientation: orientation },
      exif: {
        CreateDate: dateCreatedRaw,
        ExifImageWidth: width,
        ExifImageHeight: height,
      },
    } = await getExifData(fileBuffer);

    const exif = {
      ...(Reflect.ownKeys(gps).length ? { ...transformGpsData(gps) } : {}),
      ...(orientation ? { orientation } : {}),
      ...(dateCreatedRaw ? { ...transformDate(dateCreatedRaw) } : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
    };

    return Reflect.ownKeys(exif).length ? exif : void 0;
  } catch (error) {
    // NOOP
  }
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

function transformDate(dateMilitaryFomat) {
  const p = dateMilitaryFomat
    .split(" ")
    .map((e) => e.split(":"))
    .flat()
    .map(Number);
  return {
    dateCreated: new Date(p[0], p[1] - 1, p[2], p[3], p[4], p[5]),
    yearCreated: p[0],
    monthCreated: p[1],
  };
}

function transformGpsData({
  GPSLatitude: lat,
  GPSLongitude: lon,
  GPSLatitudeRef: latRef,
  GPSLongitudeRef: lonRef,
}) {
  return {
    lat: (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === "N" ? 1 : -1),
    lon: (lon[0] + lon[1] / 60 + lon[2] / 3600) * (lonRef === "E" ? 1 : -1),
  };
}

module.exports = {
  isExtensionSupported: function (id) {
    const ext = extname(id).slice(1).toLowerCase(); // remove dot
    return ALLOWED_EXTENSIONS.includes(ext);
  },
  processItem: async function (id) {
    let meta;
    try {
      meta = await extractMetaInfo(id);
    } catch (error) {
      // NOOP
    }
    const exif = await extractExif(id);

    return {
      id: relative(repositoryPath, id),
      ...(meta || {}),
      ...(exif || {}),
    };
  },
};
