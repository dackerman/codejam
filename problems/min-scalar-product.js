import {
    runEach,
    parseNumber,
    parseObject
} from '../input-parser';

// Try all potential combinations. Super slow.  It correctly
// calculates the small dataset, but would take forever on the large
// one.
function minScalarSlow(v1, v2) {
    if (v1.length === 1)
        return v1[0] * v2[0];

    let min = Number.MAX_SAFE_INTEGER;
    const v1Prime = without(0, v1);
    for (let i = 0; i < v2.length; i++) {
        const val = v1[0] * v2[i] + minScalar(v1Prime, without(i, v2));
        if (val < min) {
            min = val;
        }
    }
    return min;
}

function without(idx, array) {
    return array.filter((e, i) => i != idx);
}

// Sort the lists in reverse directions. Then multiply the largest by
// the smallest, next largest by next smallest, etc.  Linear time and
// doesn't allocate any extra memory.
function minScalarFast(n, v1, v2) {
    v1.sort((a,b) => a - b);
    v2.sort((a,b) => b - a);
    let min = 0;
    for (let i = 0; i < n; i++) {
        min += v1[i] * v2[i];
    }
    return min;
}

const parseVector = parseObject(line => line.split(' ').map(a => parseInt(a)));

let t = 0;

export const spec = runEach(
    minScalarFast,
    parseNumber(),
    parseVector,
    parseVector
);
