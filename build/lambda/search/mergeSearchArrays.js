"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(inputArray, currentArray) {
    return currentArray
        ? inputArray
            .filter(({ id: incomingId }) => currentArray.some((id) => incomingId === id))
            .map(({ id }) => id)
        : inputArray.map(({ id }) => id);
}
exports.default = default_1;
//# sourceMappingURL=mergeSearchArrays.js.map