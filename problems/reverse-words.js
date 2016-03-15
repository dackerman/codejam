import {
    runEach,
    parseString
} from '../input-parser';

function reverseWords(line) {
    return line.split(' ').reverse().join(' ');
}

export const spec = runEach(
    reverseWords,
    parseString()
);
