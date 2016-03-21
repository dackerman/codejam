import {
    runEach,
    parseString
} from '../input-parser';
import bigInt from 'big-integer';

// We need arbitrary precision integers, as the codejam
// problems require solutions that JavaScript can't natively
// represent!

function minTimeUntilWar(message) {
    const len = message.length;
    let digits = {};
    let digitCount = 0;
    for (let i = 0; i < len; i++) {
        const char = message[i];
        if (digits[char] === undefined) {
            if (digitCount == 0) {
                digits[char] = 1;
            } else if (digitCount == 1) {
                digits[char] = 0;
            } else {
                digits[char] = digitCount;
            }
            digitCount++;
        }
    }
    
    const base = Math.max(digitCount, 2);
    let val = bigInt();
    for (let i = 0; i < len; i++) {
        const char = message[i];
        val = val.times(base).plus(digits[char]);        
    }
    return val.toString();
}


export const spec = runEach(minTimeUntilWar, parseString());
