import {
    runEach,
    parseNumber,
    parseObject
} from '../input-parser';

function minScalar(v1, v2) {
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

const parseVector = parseObject(line => line.split(' '));

export const spec = runEach(
    (n, v1, v2) => minScalar(v1, v2),
    parseNumber(),
    parseVector,
    parseVector
);
