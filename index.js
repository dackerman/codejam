import {argv} from 'yargs';
import {run} from './input-parser';

if (argv.problem && argv.input) {
    console.log('solving ' + argv.problem);
    let spec = require('./problems/' + argv.problem).spec;
    run(`problems/${argv.input}`, argv.output, spec);
} else {
    console.log('specify a problem to solve.');
}
