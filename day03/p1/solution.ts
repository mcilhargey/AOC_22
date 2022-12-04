import * as fs from 'fs';

let Priorities = {};

console.log(`Building Priorities`);
for (let i = 0; i < 26; i++) {
    Priorities[String.fromCharCode(97+i)] = i+1;
    Priorities[String.fromCharCode(65+i)] = i+27;
}
console.log(`Priorities Built`);
fs.readFile("/dev/AOC_22/day03/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const packs = data.split('\n');
    let commonItems = [];
    for (let pack of packs) {
        const length = pack.length;
        const first_comp = pack.substring(0, length/2);
        const second_comp = pack.substring(length/2, length);
        let fcmap = new Map();
        let scmap = new Map();
        console.log(`mapping compartments ${first_comp} vs ${second_comp}`);
        for (let i = 0; i < length/2; i++) {
            fcmap.set(first_comp.charAt(i),
                !fcmap.has(first_comp.charAt(i)) ? 1 : (1 + fcmap.get(first_comp.charAt(i))));
            scmap.set(second_comp.charAt(i),
                !scmap.has(second_comp.charAt(i)) ? 1 : (1 + scmap.get(second_comp.charAt(i))));
        }
        for (let item of fcmap.keys()) {
            if (scmap.has(item)) {
                commonItems.push(item);
                break;
            }
        }
    }
    let prioritySum = 0;
    for (let item of commonItems) {
        prioritySum += Priorities[item];
    }
    console.log(`Priority sum of common items is ${prioritySum}`);
});