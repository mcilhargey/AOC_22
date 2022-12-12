import * as fs from 'fs';

type OperationFunction = (old: number) => number;
type TestFunction = (worry: number) => boolean;

class Monkey {
    items: Array<number>;
    operation: OperationFunction;
    test: TestFunction;
    trueMonkey:Monkey;
    falseMonkey:Monkey;
    inspections: number;

    constructor (items: Array<number>, 
                 opFn: OperationFunction,
                 tFn: TestFunction)
    {
        this.items = [...items];
        this.operation = opFn;
        this.test = tFn;
        this.inspections = 0;
    }

    inspectItems () {
        for (let item of this.items) {
            let newWorry = this.operation(item);
            newWorry = Math.floor(newWorry / 3);
            if (this.test(newWorry)) {
                this.trueMonkey.items.push(newWorry);
            }
            else {
                this.falseMonkey.items.push(newWorry);
            }
            this.inspections++;
        }
        this.items = [];
    }
}

const monkeySet = [
    new Monkey([83, 62, 93],
               (old) => old*17,
               (worry) => {return worry % 2 === 0}),
    new Monkey([90, 55],
               (old) => old + 1,
               (worry) => {return worry % 17 === 0}),
    new Monkey([91, 78, 80, 97, 79, 88],
               (old) => old + 3,
               (worry) => {return worry % 19 === 0}),
    new Monkey([64, 80, 83, 89, 59],
               (old) => old + 5,
               (worry) => {return worry % 3 === 0}),
    new Monkey([98, 92, 99, 51],
               (old) => old * old,
               (worry) => {return worry % 5 === 0}),
    new Monkey([68, 57, 95, 85, 98, 75, 98, 75],
               (old) => old + 2,
               (worry) => {return worry % 13 === 0}),
    new Monkey([74],
               (old) => old + 4,
               (worry) => {return worry % 7 === 0}),
    new Monkey([68, 64, 60, 68, 87, 80, 82],
               (old) => old * 19,
               (worry) => {return worry % 11 === 0}),
];
monkeySet[0].trueMonkey  = monkeySet[1];
monkeySet[0].falseMonkey = monkeySet[6];
monkeySet[1].trueMonkey  = monkeySet[6];
monkeySet[1].falseMonkey = monkeySet[3];
monkeySet[2].trueMonkey  = monkeySet[7];
monkeySet[2].falseMonkey = monkeySet[5];
monkeySet[3].trueMonkey  = monkeySet[7];
monkeySet[3].falseMonkey = monkeySet[2];
monkeySet[4].trueMonkey  = monkeySet[0];
monkeySet[4].falseMonkey = monkeySet[1];
monkeySet[5].trueMonkey  = monkeySet[4];
monkeySet[5].falseMonkey = monkeySet[0];
monkeySet[6].trueMonkey  = monkeySet[3];
monkeySet[6].falseMonkey = monkeySet[2];
monkeySet[7].trueMonkey  = monkeySet[4];
monkeySet[7].falseMonkey = monkeySet[5];

for (let i = 0; i < 20; i++) {
    for (let m = 0; m < 8; m++) {
        monkeySet[m].inspectItems();
    }
}

let monkeyInspections = monkeySet.map(monkey => monkey.inspections).sort((a,b) => a-b);

console.log(`Monkey Business is ${monkeyInspections[6]*monkeyInspections[7]}`)
