const S3 = require("aws-sdk/clients/s3");
module.exports = new S3({
  params: { Bucket: process.env.INPUT_S3_BUCKET },
  apiVersion: "2006-03-01",
});
