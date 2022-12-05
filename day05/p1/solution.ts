import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day05/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const inputData = data.split('\n');
    let splitIndex = inputData.indexOf("");
    let crateData = inputData.slice(0,splitIndex).map(row => row.split(''));
    let moves = inputData.slice(splitIndex+1);

    let stacks = {};
    let numstacks = 0;
    let l = crateData.length-1;
    for (let i = 0; i < crateData[l].length; i++) {
        let char = crateData[l][i];
        if (char !== " ") {
            let newStack = [];
            let j = l-1;
            while (j >= 0 && crateData[j][i] !== " ") {
                newStack.push(crateData[j][i]);
                j--;
            }
            stacks[char] = newStack;
            numstacks++;
        }
    }

    for (let move of moves) {
        let movesplit = move.split(" ");
        let count = parseInt(movesplit[1],10);
        let from = movesplit[3];
        let to = movesplit[5];

        for (let i = 0; i < count; i++) {
            stacks[to].push(stacks[from].pop());
        }
    }
    let topcrates = "";
    for (let i = 1; i < numstacks+1; i++) {
        topcrates = topcrates + stacks[i.toString()].pop();
    }
    console.log(`Top crates: ${topcrates}`)
});