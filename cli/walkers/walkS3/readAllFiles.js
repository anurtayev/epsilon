const ALLOWED_EXTENSIONS = ["jpg", "jpeg"];

module.exports = async function ({ inputBucket, callback, s3 }) {
  let isReadingFinished = false;
  let res;

  while (!isReadingFinished) {
    res = await s3
      .listObjectsV2({
        Bucket: inputBucket,
        MaxKeys: 100,
        ...(res ? { ContinuationToken: res.NextContinuationToken } : {}),
      })
      .promise();

    await callback(
      res.Contents.filter((element) =>
        ALLOWED_EXTENSIONS.includes(
          element.Key.split(".").slice(-1)[0].toLowerCase()
        )
      ).map(({ Key: id }) => id)
    );

    isReadingFinished = !res.IsTruncated;
  }
};
