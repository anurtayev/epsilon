"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
exports.default = (entries, pageSize, token) => {
    (0, assert_1.strict)(pageSize, "pageSize must be a number that is greater than zero");
    let newNextToken;
    const foundIndex = entries.findIndex((id) => id === token);
    const startingIndex = token ? (foundIndex >= 0 ? foundIndex : 0) : 0;
    if (entries.length > startingIndex + pageSize - 1) {
        newNextToken = entries[startingIndex + pageSize];
    }
    return { startingIndex, newNextToken };
};
//# sourceMappingURL=findTokenIndex.js.map