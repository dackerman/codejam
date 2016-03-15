# David's CodeJam solutions

## Usage

1. `npm install`
1. `npm start -- --problem=<problem name> --input=<input file>`

## Example

This command runs the 'rope-intranet' problem (see
`problems/rope-intranet.js`) with the input file given in the same
directory, and output file named `answer.txt`. If you omit the output
file, it will print the answer to stdout.

`npm start -- --problem='rope-intranet' --input='./problems/rope-intranet-small.in' --output='answer.txt'`

## Adding your solutions

`input-parser.js` contains a simple parser for codejam input
files. For instance, for lists of things, it consumes one line that is
the ocunt of things, then executes a sub-parser for each of those
things (each sub parser outputs some datastructure, and may consume
any number of lines).

For instance, in `rope-intranet.js`, we have the following spec:

    export const spec = runEach(ropeTest, parseList(
        parseObject(line => {
            let  [left, right] = line.split(' ');
            left = parseInt(left);
            right = parseInt(right);
            return {left, right};
        })
    ));

the `runEach` says to run the following function for each test-case
(where the first line is the number of test cases, and then each test
case follows).  The value passed into the function `ropeTest` is a
list of ropes. That's done with `parseList`, which has similar
functionality to `runEach` but returns a list of things given a
sub-parser, and the `parseObject` takes each line for a rope and
parses it out into the left and right building heights per the
problem.  Example input would look like this:

    2   // number of test cases
    2   // number of ropes (test case 1)
    3 3 // height of 3 for left building, 3 for right building (rope 1)
    4 1 // height of 4 for left building, 1 for right building (rope 2)
    1   // number of ropes (test case 2)
    7 4 // height of 7 for left building, 4 for right building (rope 1)

