import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day04/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const pairs = data.split('\n');
    let numPairs = 0;
    for (let pair of pairs) {
        let elves = pair.split(',').map(x => x.split('-').map(y => parseInt(y,10)))
            .sort((a,b) => {
                if (a[0] === b[0]) {
                    return b[1]-a[1];
                }
                return a[0]-b[0];
            });
        if (elves[0][0] <= elves[1][0] && elves[0][1] >= elves[1][1]) {
            numPairs += 1;
        }
    }
    console.log(`There are ${numPairs} overlapping elves`);
});