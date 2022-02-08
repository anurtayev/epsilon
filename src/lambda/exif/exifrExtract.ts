import exifr from "exifr";

export async function exifrExtract(mediaFileBuf) {
  const exifrData = await exifr.parse(mediaFileBuf);

  if (exifrData) {
    const {
      Orientation: orientation,
      CreateDate: dateCreated,
      ExifImageWidth: width,
      ExifImageHeight: height,
      latitude,
      longitude,
    } = exifrData;

    return {
      ...(orientation ? { orientation } : {}),
      ...(dateCreated
        ? { dateCreated: dateCreated && dateCreated.toISOString() }
        : {}),
      ...(width ? { width } : {}),
      ...(height ? { height } : {}),
      ...(latitude ? { latitude } : {}),
      ...(longitude ? { longitude } : {}),
      ...(dateCreated
        ? { monthCreated: dateCreated && dateCreated.getMonth() + 1 }
        : {}),
      ...(dateCreated
        ? { yearCreated: dateCreated && dateCreated.getFullYear() }
        : {}),
    };
  }
}
