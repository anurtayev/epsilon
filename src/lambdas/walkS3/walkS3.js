const CMD_NAME = "walkS3";
const { Command } = require("commander");
const cmd = new Command(CMD_NAME);
module.exports = cmd;

// const { readFile } = require("fs/promises");

// const { batchWrite } = require("../../services/dynamodb");
const {
  getObject,
  readAllFilesFilteredByAllowedExtension,
} = require("../../services/s3");
const { getMetaFilePath, getExifData } = require("../../util");

cmd.action(async () => {
  await readAllFilesFilteredByAllowedExtension(sendToDynamo);
});

async function sendToDynamo(elements) {
  while (elements.length) {
    const items = await Promise.all(elements.splice(0, 25).map(processItem));

    console.log(JSON.stringify(items, null, 2));

    // await batchWrite({
    //   RequestItems: {
    //     items,
    //   },
    // });
  }
}

async function processItem(id) {
  const meta = await extractMetaInfo(id);
  const exif = await extractExif(id);
  return {
    PutRequest: {
      Item: {
        id,
        ...(meta || {}),
        ...(exif || {}),
      },
    },
  };
}

async function extractMetaInfo(id) {
  let res;
  let meta;
  try {
    res = await getObject(getMetaFilePath(id));
    meta = JSON.parse(res.Body.toString());
  } catch (error) {
    // NOOP
  }

  return meta;
}

async function extractExif(id) {
  const { Body: fileBuffer } = await getObject(id);

  try {
    const {
      gps,
      image: { Orientation, XResolution, YResolution },
      exif: { CreateDate, ExifImageWidth, ExifImageHeight },
    } = await getExifData(fileBuffer);

    return {
      gps,
      orientation: Orientation,
      xResolution: XResolution,
      yResolution: YResolution,
      dateCreated: CreateDate,
      width: ExifImageWidth,
      height: ExifImageHeight,
    };
  } catch (error) {
    // console.log(error);
  }
}
