"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtension = exports.isKeyExtensionAllowed = void 0;
const path_1 = require("path");
const isKeyExtensionAllowed = (ext) => process.env.ALLOWED_EXTENSIONS.split("|").includes(ext);
exports.isKeyExtensionAllowed = isKeyExtensionAllowed;
const getExtension = (key) => (0, path_1.extname)(key).toLowerCase().slice(1);
exports.getExtension = getExtension;
//# sourceMappingURL=util.js.map