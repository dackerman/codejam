import fs from 'fs';

function runRunEach(input, fn, nextParser) {
    const count = input.next();
    let output = [];
    for (let i = 0; i < count; i++) {
        const result = fn(nextParser(input));
        output.push(`Case #${i+1}: ${result}`);
    }
    return output;
}

function runParseList(input, nextParser) {
    const count = input.next();
    let out = [];
    for (let i = 0; i < count; i++) {
        out.push(nextParser(input));
    }
    return out;
}

export function runParseObject(input, fn) {
    const line = input.next();
    return fn(line);
}

export function runEach(fn, parser) {
    return (input) => {
        return runRunEach(input, fn, parser);
    };
}

export function parseList(parser) {
    return (input) => {
        return runParseList(input, parser);
    };
}

export function parseObject(fn) {
    return (input) => {
        return runParseObject(input, fn);
    };
}

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
    lines = lines.splice(0, lines.length - 1);
    const output = spec(inputIterator(lines));
    if (outputFilename) {
        fs.writeFileSync(outputFilename, output.join('\n'));
    } else {
        output.forEach(line => console.log(line));
    }
}
