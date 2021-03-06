import fs from 'fs';

function parserFn(fn) {
    return (...args) => {
        return input => {
            return fn.apply(null, [input].concat(args));
        };
    };
}

export const runEach = parserFn((input, fn, ...argsParsers) => {
    const count = input.next();
    let output = [];
    for (let i = 0; i < count; i++) {
        const args = argsParsers.map(fn => fn(input));
        const result = fn.apply(null, args);
        output.push(formatTestCase(i, result));
    }
    return output;
});

export function formatTestCase(i, contents) {
    return `Case #${i+1}: ${contents}`;
}

export const parseNumber = parserFn(input => parseInt(input.next()));

export const parseString = parserFn(input => input.next());

export const parseListObject = parserFn(input => {
    return input.next().split(' ').map(s => parseInt(s));
});

export const parseList = parserFn((input, listItemParser) => {
    const count = input.next();
    let out = [];
    for (let i = 0; i < count; i++) {
        out.push(listItemParser(input));
    }
    return out;
});

export const parseObject = parserFn((input, fn) => {
    const line = input.next();
    return fn(line);
});

export function inputIterator(input) {
    let idx = 0;
    const api = {
        next: () => {
            idx++;
            return input[idx-1];
        }
    };
    return api;
}

export function run(filename, outputFilename, spec) {
    let lines = fs.readFileSync(filename, {encoding: 'utf-8'}).split('\n');
    lines = lines.filter(a => a); // remove blank lines
    const output = spec(inputIterator(lines));
    if (outputFilename) {
        fs.writeFileSync(outputFilename, output.join('\n'));
    } else {
        output.forEach(line => console.log(line));
    }
}
