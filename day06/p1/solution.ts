import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day06/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let position = 0;
    const numDistinct = 4;
    while (position < data.length - numDistinct) {
        let substr = data.slice(position, position+numDistinct);
        let charset = new Set(substr.split(""));
        if (charset.size === numDistinct) {
            break;
        }
        position++;
    }
    console.log(`Start marker is at ${position + numDistinct}`)
});