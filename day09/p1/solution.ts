import * as fs from 'fs';

interface Position {
    x: number,
    y: number
};

fs.readFile("/dev/AOC_22/day09/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const moves = data.split("\n");

    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;
    let head: Position = {x: 0, y: 0};
    let tail: Position = {x: 0, y: 0};

    for (let move of moves) {
        let dir: string, dist: string;
        [dir, dist] = move.split(" ");
        switch (dir) {
            case "U":
                head.y += parseInt(dist,10);
                break;
            case "D":
                head.y -= parseInt(dist,10);
                break;
            case "R":
                head.x += parseInt(dist,10);
                break;
            case "L":
                head.x -= parseInt(dist,10);
                break;
        }
        minX = Math.min(minX, head.x);
        maxX = Math.max(maxX, head.x);
        minY = Math.min(minY, head.y);
        maxY = Math.max(maxY, head.y);
    }

    // Tail can be on any side of HEAD;
    minX--;
    minY--;
    maxX++;
    maxY++;
    const numCols = maxX-minX;
    const numRows = maxY-minY;
    let grid = new Array(numCols);
    for (let i = 0; i < numCols; i++) {
        grid[i] = Array(numRows).fill(0);
    }
    function x2i(x:number):number { return x-minX; }
    function y2j(y:number):number { return y-minY; }
    function isAdjacent(h: Position, t: Position): boolean {
        return Math.sqrt(Math.pow(h.y-t.y,2) + Math.pow(h.x-t.x,2)) < Math.sqrt(3); // diagonals will be sqrt(2), next highest is sqrt(3) which is non-adj
    }

    head = {x: 0, y:0};
    let numVisited = 1;
    grid[x2i(tail.x)][y2j(tail.y)] = 1;
    for (let move of moves) {
        let dir: string, dist: string;
        [dir, dist] = move.split(" ");
        switch (dir) {
            case "U":
                for (let i = 0; i < parseInt(dist,10); i++) {
                    head.y++;
                    if (!isAdjacent(head,tail)) {
                        tail = {x: head.x, y: head.y - 1};
                        if (grid[x2i(tail.x)][y2j(tail.y)] !== 1) {
                            grid[x2i(tail.x)][y2j(tail.y)] = 1;
                            numVisited++;
                        }
                    }
                }
                break;
            case "D":
                for (let i = 0; i < parseInt(dist,10); i++) {
                    head.y--;
                    if (!isAdjacent(head,tail)) {
                        tail = {x: head.x, y: head.y + 1};
                        if (grid[x2i(tail.x)][y2j(tail.y)] !== 1) {
                            grid[x2i(tail.x)][y2j(tail.y)] = 1;
                            numVisited++;
                        }
                    }
                }
                break;
            case "R":
                for (let i = 0; i < parseInt(dist,10); i++) {
                    head.x++;
                    if (!isAdjacent(head,tail)) {
                        tail = {x: head.x - 1, y: head.y};
                        if (grid[x2i(tail.x)][y2j(tail.y)] !== 1) {
                            grid[x2i(tail.x)][y2j(tail.y)] = 1;
                            numVisited++;
                        }
                    }
                }
                break;
            case "L":
                for (let i = 0; i < parseInt(dist,10); i++) {
                    head.x--;
                    if (!isAdjacent(head,tail)) {
                        tail = {x: head.x + 1, y: head.y};
                        if (grid[x2i(tail.x)][y2j(tail.y)] !== 1) {
                            grid[x2i(tail.x)][y2j(tail.y)] = 1;
                            numVisited++;
                        }
                    }
                }
                break;
        }
    }
    console.log("AFTER")
    console.log(grid.map(v=>v.join("")).join("\n"))
    console.log(`Grid positions: ${grid.map(v=>v.join("")).join("").split("").reduce((a,v) => a + parseInt(v,10),0)}`)
    console.log(`The tail visited ${numVisited} locations`)
});