import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day10/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const commands = data.split("\n");
    let cycle = 0;
    let reg_X = 1;
    let flatCRT = new Array(240).fill(".");

    function checkCycle() {
        if (cycle % 40 - 1 === reg_X) {
            flatCRT[cycle] = "#";
        }
        else if (reg_X > 0 && (cycle % 40 - 1 === reg_X - 1)) {
            flatCRT[cycle] = "#";
        }
        else if (reg_X < 39 && (cycle % 40 - 1 === reg_X + 1)) {
            flatCRT[cycle] = "#";
        }
    }

    for (let command of commands) {
        if (command === "noop") {
            cycle++;
            checkCycle();
        }
        else if (command.startsWith("addx")) {
            const val = parseInt(command.split(" ")[1],10);
            cycle++;
            checkCycle();
            cycle++;
            checkCycle();
            reg_X = reg_X + val;
        }
    }

    let display = "";
    while (flatCRT.length) {
        display += flatCRT.splice(0,40).join("") + "\n";
    }
    console.log(display);
});