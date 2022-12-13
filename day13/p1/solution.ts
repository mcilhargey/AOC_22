import * as fs from 'fs';

type Signal = Array<Signal|number>;

interface Pair {
    left: Signal;
    right: Signal;
};

function isInOrder(pair: Pair): boolean | null {
    if (pair.left.length === 0 && pair.right.length > 0) {
        // Left ran out of items, pairs in order
        return true; 
    }
    if (pair.right.length === 0 && pair.left.length > 0) {
        // Right ran out of items, pairs not in order
        return false; 
    }
    let minLength = Math.min(pair.left.length, pair.right.length);
    for (let i = 0; i < minLength; i++) {
        let left = pair.left[i];
        let right = pair.right[i];
        if (typeof left  === "number" &&
            typeof right === "number") 
        {
            if (left === right) { 
                continue;
            }
            else { return left < right;}
        }
        else if (typeof left  === "number" &&
            typeof right === "object") 
        {
            let res = isInOrder({"left": [left], "right":right});
            if (res !== null) { return res; }
        }
        else if (typeof left  === "object" &&
            typeof right === "number") 
        {
            let res = isInOrder({"left": left, "right": [right]});
            if (res !== null) { return res; }
        }
        else if (typeof left  === "object" &&
            typeof right === "object")
        {
            let res = isInOrder({"left": left, "right": right});
            if (res !== null) { return res; }
        }
    }
    if (pair.left.length === pair.right.length) {
        return null;
    }
    // If left ran out, pairs in order, else pairs not in order
    return pair.left.length < pair.right.length;
}

fs.readFile("/dev/AOC_22/day13/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const inputLines = data.split("\n");

    let pairs = [];
    for (let i = 0; i < inputLines.length; i = i+3) {
        let pair = {
            left: JSON.parse(inputLines[i]),
            right: JSON.parse(inputLines[i+1]),
            inOrder: null
        };
        pairs.push(pair);
    }
    let index = 1;
    let sum = 0;
    for (let pair of pairs) {
        pair.inOrder = isInOrder(pair);
        if (pair.inOrder) {
            sum += index;
        }
        index++;
    }

    console.log(`Sum of in order pairs ${sum}`);
});