import * as fs from 'fs';

fs.readFile("/dev/AOC_22/day08/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const grid = data.split("\n").map(row => row.split("").map(x=>parseInt(x,10)));
    const numRows = grid.length;
    const numCols = grid[0].length;
    let visible = Array(numRows*numCols).fill(0);

    function getVisible(i,j) {
        return visible[i*numCols + j] === 1;
    }
    function setVisible(i,j) {
        visible[i*numCols + j] = 1;
    }

    let numVisible = 0;
    for (let i = 0; i < numRows; i++) {
        let j = 0;
        let maxheight = 0;
        while (j < numCols && maxheight < 9){
            if (j === 0 || grid[i][j] > maxheight) {
                if (!getVisible(i,j)) {
                    numVisible ++;
                    setVisible(i,j);
                }
                maxheight = grid[i][j];
            }
            j++;
        }
        j = numCols - 1;
        maxheight = 0
        while (j >= 0 && maxheight < 9) {
            if (j === numCols - 1 || grid[i][j] > maxheight) {
                if (!getVisible(i,j)) {
                    numVisible ++;
                    setVisible(i,j);
                }
                maxheight = grid[i][j];
            }
            j--;
        }
    }
    for (let j = 0; j < numCols; j ++) {
        let i = 0;
        let maxheight = 0;
        while (i < numRows && maxheight < 9) {
            if (i === 0 || grid[i][j] > maxheight) {
                if (!getVisible(i,j)) {
                    numVisible ++;
                    setVisible(i,j);
                }
                maxheight = grid[i][j];
            }
            i++;
        }
        i = numRows - 1;
        maxheight = 0;
        while (i >= 0 && maxheight < 9) {
            if (i === numRows - 1 || grid[i][j] > maxheight) {
                if (!getVisible(i,j)) {
                    numVisible ++;
                    setVisible(i,j);
                }
                maxheight = grid[i][j];
            }
            i--;
        }
    }

    console.log(`There are ${numVisible} visible trees`)
    // let visibleGrid = [];
    // while (visible.length) {visibleGrid.push(visible.splice(0,numCols).join(""))};
    // console.log(visibleGrid.join("\n"))
});