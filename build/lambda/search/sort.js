"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitter = exports.stripper = exports.sorter = exports.getValue = void 0;
const graphqlTypes_1 = require("../../lib/graphqlTypes");
function default_1(entriesWithAttributes, attributesSorter) {
    const sortResult = attributesSorter.reduce((innerSortResult, { attribute, sortOrder }) => {
        innerSortResult.forEach((currentArray) => (0, exports.sorter)(currentArray, attribute, sortOrder));
        return (0, exports.splitter)(innerSortResult, attribute);
    }, [entriesWithAttributes]);
    return sortResult.flat();
}
exports.default = default_1;
const getValue = (attributes, attribute) => attributes?.find(([att]) => attribute === att)?.[1];
exports.getValue = getValue;
const sorter = (arr, attribute, sortOrder) => arr.sort(({ attributes: attributes1 }, { attributes: attributes2 }) => {
    const value1 = (0, exports.getValue)(attributes1, attribute);
    const value2 = (0, exports.getValue)(attributes2, attribute);
    if (!value1 && !value2)
        return 0;
    else if (!value1 && value2)
        return 1;
    else if (value1 && !value2)
        return -1;
    else if (value1 === value2)
        return 0;
    else
        return sortOrder === graphqlTypes_1.SortOrder.Asc
            ? value1 < value2
                ? -1
                : 1
            : value1 > value2
                ? -1
                : 1;
});
exports.sorter = sorter;
const stripper = (entriesWithAttributes) => entriesWithAttributes.map(({ id }) => id);
exports.stripper = stripper;
const splitter = (sortResult, attribute) => sortResult.reduce((acc, curr) => {
    let currentAccumulator = [];
    let groupValue = (0, exports.getValue)(curr[0].attributes, attribute);
    for (const entryWithAttributes of curr) {
        const currentValue = (0, exports.getValue)(entryWithAttributes.attributes, attribute);
        if (currentValue !== groupValue) {
            acc.push(currentAccumulator);
            currentAccumulator = [];
            groupValue = currentValue;
        }
        currentAccumulator.push(entryWithAttributes);
    }
    acc.push(currentAccumulator);
    return acc;
}, []);
exports.splitter = splitter;
//# sourceMappingURL=sort.js.map