import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day08/p2/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const grid = data.split("\n").map(row => row.split("").map(x=>parseInt(x,10)));
    const numRows = grid.length;
    const numCols = grid[0].length;

    function getVisibilityScore(i,j) {
        let visibleScore = 1;
        let a = i-1;
        let count = 0;
        while (a >= 0) { // GO UP
            count++;
            if (grid[a][j] >= grid[i][j]) {
                break;
            }
            a--;
        }
        visibleScore *= count;
        a = i+1;
        count = 0;
        while (a < numRows) { // GO DOWN
            count++;
            if (grid[a][j] >= grid[i][j]) {
                break;
            }
            a++;
        }
        visibleScore *= count;
        let b = j-1;
        count = 0;
        while (b >= 0) { // GO LEFT
            count++;
            if (grid[i][b] >= grid[i][j]) {
                break;
            }
            b--;
        }
        visibleScore *= count;
        b = j+1;
        count = 0;
        while (b < numCols) { // GO RIGHT
            count++;
            if (grid[i][b] >= grid[i][j]) {
                break;
            }
            b++;
        }
        visibleScore *= count;

        return visibleScore;
    }

    let maxScore = 0;
    for (let i = 1; i < numRows - 1; i++) {
        for (let j = 1; j < numCols - 1; j++) {
            maxScore = Math.max(maxScore, getVisibilityScore(i,j));
        }
    }

    console.log(`Best visibility score is ${maxScore}`)
});