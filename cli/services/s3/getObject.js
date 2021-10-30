const s3 = require("./s3");
module.exports = async function (id) {
  return s3
    .getObject({
      Key: id,
    })
    .promise();
};
