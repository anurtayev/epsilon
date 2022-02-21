"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const console_1 = require("console");
const promises_1 = require("fs/promises");
const exifrExtract_1 = require("./exifrExtract");
const filePath = '../../Downloads/heli2.jpg';
const run = async () => {
    let exif;
    try {
        const buf = await (0, promises_1.readFile)(filePath);
        exif = await (0, exifrExtract_1.exifrExtract)(buf);
        exif && (0, console_1.info)("exif source: file");
    }
    catch (e) {
        (0, console_1.error)(e);
    }
    (0, console_1.info)("exif:", exif);
};
exports.run = run;
(0, exports.run)();
//# sourceMappingURL=exif.local.js.map