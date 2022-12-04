import * as fs from 'fs';

let Priorities = {};

console.log(`Building Priorities`);
for (let i = 0; i < 26; i++) {
    Priorities[String.fromCharCode(97+i)] = i+1;
    Priorities[String.fromCharCode(65+i)] = i+27;
}
console.log(`Priorities Built`);
fs.readFile("/dev/AOC_22/day03/p2/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const packs = data.split('\n');
    let commonItems = [];
    let packLength = packs.length;
    for (let group = 0; group < packLength; group +=3) {
        const first_pack = packs[group];
        const second_pack = packs[group+1];
        const third_pack = packs[group+2];
        console.log(`Three packs: ${first_pack}, ${second_pack}, ${third_pack}`)
        let fmap = new Set();
        for (let i = 0; i < first_pack.length; i++) {
            fmap.add(first_pack.charAt(i));
        }
        
        let smap = new Set();
        for (let i = 0; i < second_pack.length; i++) {
            if (fmap.has(second_pack.charAt(i))) {
                smap.add(second_pack.charAt(i));
            }
        }
        let tmap = new Set();
        for (let i = 0; i < third_pack.length; i++) {
            if (smap.has(third_pack.charAt(i))) {
                tmap.add(third_pack.charAt(i));
            }
        }
        console.log(`Three Maps ${JSON.stringify(Array.from(fmap.values()))}, ${JSON.stringify(Array.from(smap.values()))}, ${JSON.stringify(Array.from(tmap.values()))}`)
        commonItems.push(tmap.values().next().value);
    }
    let prioritySum = 0;
    for (let item of commonItems) {
        prioritySum += Priorities[item];
    }
    console.log(`Priority sum of common items is ${prioritySum}`);
});