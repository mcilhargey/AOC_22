import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day10/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const commands = data.split("\n");
    let cycle = 0;
    let reg_X = 1;
    let strengthSum = 0;

    const CycleChecks = [20,60,100,140,180,220];

    function checkCycle(command) {
        if (CycleChecks.indexOf(cycle) !== -1) {
            const strength = cycle * reg_X;
            console.log(`Cycle ${cycle}: ${command} - strength ${strength}`);
            strengthSum += strength;
        }
        else {
            console.log(`Cycle ${cycle}: ${command}`)
        }
    }

    for (let command of commands) {
        if (command === "noop") {
            cycle++;
            checkCycle(command);
        }
        else if (command.startsWith("addx")) {
            const val = parseInt(command.split(" ")[1],10);
            cycle++;
            checkCycle(command);
            cycle++;
            checkCycle(command);
            reg_X = reg_X + val;
        }
    }

    console.log(`Strength sum = ${strengthSum}`)
});