import {formatTestCase} from '../input-parser';


function findPossibilities(words, message) {
    return recFindPossibilities(0, words, message);
}

function recFindPossibilities(i, words, message) {
    if (!words) return 0;

    const possibleChars = message[i];
    let possibilities = 0;

    if (i < message.length - 1) {
        // if not the last character, call recursively
        possibleChars.forEach(ch => {
            possibilities += recFindPossibilities(i + 1, words[ch], message);
        });
    } else {
        // if last character, just count the number of matches
        possibleChars.forEach(ch =>{
            if (words[ch] !== undefined) {
                possibilities++;
            }
        });
    }
    return possibilities;
}

export const spec = input => {
    let output = [];
    
    const [L, D, N] = input.next().split(' ');

    // build a prefix trie out of the words for fast lookup
    let words = {};
    for (let i = 0; i < D; i++) {
        const word = input.next();
        let trie = words;
        for (let c = 0; c < word.length; c++) {
            const ch = word[c];
            if (trie[ch] === undefined) trie[ch] = {};
            trie = trie[ch];
        }
    }

    // parse the parens into nested lists for easy iteration
    for (let i = 0; i < N; i++) {
        let line = input.next();
        let inParens = false;
        let message = [];
        let currentLetters = [];
        for (let c = 0; c < line.length; c++) {
            let ch = line[c];
            switch (ch) {
            case '(':
                inParens = true;
                break;
            case ')':
                inParens = false;
                message.push(currentLetters);
                currentLetters = [];
                break;
            default:
                currentLetters.push(ch);
                if (!inParens) {
                    message.push(currentLetters);
                    currentLetters = [];
                }
            }
        }

        const possibilities = findPossibilities(words, message);
        output.push(formatTestCase(i, possibilities));
    }
    
    return output;
};
