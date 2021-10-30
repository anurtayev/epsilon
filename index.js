const { readFile } = require("fs/promises");
const { promisify } = require("util");
const { ExifImage } = require("exif");

const getExifData = promisify(ExifImage);

async function run() {
  const fileBuffer = await readFile(
    "/Users/adilnurtayev/picrepo/f1/IMG_1363 2.jpg"
  );

  const {
    gps,
    image: { Orientation, XResolution, YResolution },
    exif: { CreateDate, ExifImageWidth, ExifImageHeight },
  } = await getExifData(fileBuffer);

  const exifData = {
    gps,
    orientation: Orientation,
    xResolution: XResolution,
    yResolution: YResolution,
    dateCreated: CreateDate,
    width: ExifImageWidth,
    height: ExifImageHeight,
  };

  console.log(exifData);
}

run();
