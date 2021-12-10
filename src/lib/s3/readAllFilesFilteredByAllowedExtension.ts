const { isExtensionSupported } = require("../../util");
const s3 = require("./s3");

module.exports = async function (callback) {
  let isReadingFinished = false;
  let res;

  while (!isReadingFinished) {
    res = await s3
      .listObjectsV2({
        MaxKeys: 100,
        ...(res ? { ContinuationToken: res.NextContinuationToken } : {}),
      })
      .promise();

    await callback(
      res.Contents.map(({ Key: id }) => id).filter(isExtensionSupported)
    );

    isReadingFinished = !res.IsTruncated;
  }
};
