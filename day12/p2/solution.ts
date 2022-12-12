import * as fs from 'fs';
import * as bmpjs from 'bmp-js';

class Node {
    i: number;
    j: number;
    parent: Node;

    constructor(i,j) {
        this.i = i;
        this.j = j;
    }
}

fs.readFile("/dev/AOC_22/day12/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let heightMap = data.split("\n").map(row => row.split(""));
    const numRows = heightMap.length;
    const numCols = heightMap[0].length;
    let start = null;
    let end = null;
    for (let i = 0; i < numRows; i++) {
        let row = heightMap[i];
        for (let j = 0; j < numCols; j++) {
            if (heightMap[i][j] === 'S') {
                start = new Node(i,j);
                heightMap[i][j] = 'a';
            }
            else if (heightMap[i][j] === 'E') {
                end = new Node(i,j);
                heightMap[i][j] = 'z';
            }
            if (start && end) {
                break;
            }
        }
    }
    let moveMap = [];
    let visited = [];
    const moves = [
        {i: -1, j:  0},
        {i:  1, j:  0},
        {i:  0, j:  1},
        {i:  0, j: -1}
    ];

    for (let i = 0; i < numRows; i++) {
        moveMap[i] = new Array(numCols).fill(-1);
        visited[i] = new Array(numCols).fill(0);
    }
    function inBounds(i,j) {
        return (i >= 0 && i < numRows) && (j >= 0 && j < numCols)
    }
    moveMap[end.i][end.j] = 0;

    let nodesToCheck:Array<Node> = [];
    nodesToCheck.push(end);
    visited[end.i][end.j] = 1;
    let minRoute = 999999;
    let maxRoute = 0;
    while (nodesToCheck.length) {
        let node = nodesToCheck.shift();
        if (heightMap[node.i][node.j] === "a") {
            minRoute = Math.min(minRoute, moveMap[node.i][node.j]);
        }
        for (let move of moves) {
            if (inBounds(node.i+move.i, node.j+move.j) && 
                !visited[node.i+move.i][node.j+move.j] &&
                heightMap[node.i][node.j].charCodeAt(0) - heightMap[node.i+move.i][node.j+move.j].charCodeAt(0) <= 1)
            {
                let newNode = new Node(node.i+move.i, node.j+move.j);
                newNode.parent = node;
                visited[node.i+move.i][node.j+move.j] = 1;
                moveMap[node.i+move.i][node.j+move.j] = moveMap[node.i][node.j] + 1;
                maxRoute = Math.max(maxRoute, moveMap[node.i+move.i][node.j+move.j]);
                nodesToCheck.push(newNode);
            }
        }
    }
    console.log(`Minimal route is ${minRoute}`)
    let bData = new Uint8Array(numCols*numRows*4);
    let startIndex = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            bData[startIndex] = 255;
            bData[startIndex + 1] = 0;
            bData[startIndex + 2] = 255 - Math.floor(255 * moveMap[i][j] / maxRoute);
            bData[startIndex + 3] = 0;
            startIndex += 4;
        }
    }
    let bmpData ={data:bData,width:numCols,height:numRows};
    let rawData = bmpjs.encode(bmpData);
    fs.writeFile("/dev/AOC_22/day12/p2/heightmap.bmp", rawData.data, (err) => {
        console.log(err);
    });    

});