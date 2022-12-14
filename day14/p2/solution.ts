import * as fs from 'fs';


function renderMap(map, minPair, maxPair) {
    let mapString = "";
    for (let i = 0; i < maxPair.y + 3; i++) {
        let row = map[i];
        mapString += row.slice(minPair.x, maxPair.x).join("") + "\n";
    }
    console.log(mapString);
}

function sandGrainStep(sandGrain, map) {
    if (map[sandGrain.y+1][sandGrain.x] === ".") {
        return {x: 0, y: 1};
    }
    else if (map[sandGrain.y+1][sandGrain.x-1] === ".") {
        return {x: -1, y: 1};
    }
    else if (map[sandGrain.y+1][sandGrain.x+1] === ".") {
        return {x: 1, y: 1};
    }
    else {
        return null;
    }
}

fs.readFile("/dev/AOC_22/day14/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    let maxPair = {x: 0, y: 0};
    let minPair = {x: 9999, y: 9999};

    let paths = [];
    for (let line of data.split("\n")) {
        const path = line.split(" -> ").map((rockStr) => {
            const rockSplit = rockStr.split(",");
            return {x: parseInt(rockSplit[0],10), y: parseInt(rockSplit[1],10)};
        });
        for (let rock of path) {
            maxPair.x = Math.max(maxPair.x, rock.x);
            maxPair.y = Math.max(maxPair.y, rock.y);
            minPair.x = Math.min(minPair.x, rock.x);
            minPair.y = Math.min(minPair.y, rock.y);
        }
        paths.push(path);
    }

    let map = new Array(maxPair.y + 1 + 2);
    for (let i = 0; i < maxPair.y + 1 + 2; i++) {
        map[i] = new Array(2*maxPair.x).fill('.');
    }

    for (let path of paths) {
        map[path[0].y][path[0].x] = "#";
        for (let k = 1; k < path.length; k++) {
            if (path[k].x === path[k-1].x) {
                for (let i = Math.min(path[k-1].y, path[k].y); i <= Math.max(path[k-1].y, path[k].y); i++) {
                    map[i][path[k].x] = "#";
                }
            }
            else if (path[k].y === path[k-1].y) {
                for (let j = Math.min(path[k-1].x,path[k].x) ; j <= Math.max(path[k-1].x,path[k].x); j++) {
                    map[path[k].y][j] = "#";
                }
            }
        }
    }
    map[0][500] = "+";

    for (let j = 0; j < map[maxPair.y+2].length; j++) {
        map[maxPair.y+2][j] = "#";
    }

    minPair.x = 500 - (maxPair.y + 3 + 1);
    maxPair.x = 500 + (maxPair.y + 3 + 1);

    let hitTop = false;
    let sandGrains = 0;
    while(!hitTop) {
        let sandGrain = {x: 500, y:0};
        let sandMove = sandGrainStep(sandGrain, map);
        while (sandMove) {
            sandGrain.x += sandMove.x;
            sandGrain.y += sandMove.y;
            sandMove = sandGrainStep(sandGrain, map);
        }
        if (sandGrain.x === 500 && sandGrain.y === 0) {
            hitTop = true;
            map[sandGrain.y][sandGrain.x] = 'o';
        }
        if (!hitTop) {
            map[sandGrain.y][sandGrain.x] = 'o';
            sandGrains++;
        }
    }
    

    renderMap(map, minPair, maxPair);
    let altCount = 0;
    for (let i = 0; i < maxPair.y + 2 + 1; i++) {
        for (let j = 0; j < map[i].length; j++) {
            if (map[i][j] === 'o') {
                altCount++;
            }
        }
    }
    console.log(`There are ${altCount} stationary grains`);
});