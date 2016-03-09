'use strict';

import {runEach, parseList, parseObject} from '../input-parser';

function ropeTest(wires) {
    let crossCount = 0;
    
    for (let i = 0; i < wires.length; i++) {
        const wire1 = wires[i];
        for (let j = i + 1; j < wires.length; j++) {
            const wire2 = wires[j];
            const crossLeft = wire1.left < wire2.left && wire1.right > wire2.right;
            const crossRight = wire1.left > wire2.left && wire1.right < wire2.right;
            if (crossLeft || crossRight) {
                crossCount++;
            }
        }
    }

    return crossCount;
}

export const spec = runEach(ropeTest, parseList(
    parseObject(line => {
        let  [left, right] = line.split(' ');
        left = parseInt(left);
        right = parseInt(right);
        return {left, right};
    })
));

export default spec;
