import s3 from "./s3";

export default async function (id: string) {
  return s3
    .getObject({
      Key: id,
      Bucket: "",
    })
    .promise();
}
