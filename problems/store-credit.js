import {
    runEach,
    parseNumber,
    parseListObject
} from '../input-parser';


function storeCredit(credit, numItems, items) {
    for (let i = 0; i < numItems; i++) {
        let firstItem = items[i];
        for (let j = i+1; j < numItems; j++) {
            let secondItem = items[j];
            if (firstItem + secondItem === credit) {
                return `${i+1} ${j+1}`;
            }
        }
    }
}


export const spec = runEach(
    storeCredit,
    parseNumber(),
    parseNumber(),
    parseListObject()
);
