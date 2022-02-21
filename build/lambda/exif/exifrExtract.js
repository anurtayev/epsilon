"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exifrExtract = void 0;
const exifr_1 = require("exifr");
async function exifrExtract(mediaFileBuf) {
    const exifrData = await exifr_1.default.parse(mediaFileBuf);
    if (exifrData) {
        const { Orientation: orientation, CreateDate: dateCreated, ExifImageWidth: width, ExifImageHeight: height, latitude, longitude, } = exifrData;
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
exports.exifrExtract = exifrExtract;
//# sourceMappingURL=exifrExtract.js.map