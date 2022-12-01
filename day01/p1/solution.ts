import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day01/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const items = data.split('\n');
    let elves = [0];
    let elf_index = 0;
    let maxCal = 0;
    for (let item of items) {
        if (item === "") {
            if (elves[elf_index] > maxCal) {
                maxCal = elves[elf_index];
            }
            elf_index++;
            elves.push(0);
        } 
        else {
            elves[elf_index] += parseInt(item,10);
        }
    }
    console.log(`Max Calories is ${maxCal}`);
});