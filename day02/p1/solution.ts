import * as fs from 'fs';

const ShapeScore = {
    "X" : 1,
    "Y" : 2,
    "Z" : 3
};

const PlayScore = {
    "X" : {"A":3, "B":0, "C":6},
    "Y" : {"A":6, "B":3, "C":0},
    "Z" : {"A":0, "B":6, "C":3}
};

function calculateScore(play :string): number {
    let score = 0;
    const yours = play.charAt(2);
    const theirs = play.charAt(0);
    score = ShapeScore[yours] + PlayScore[yours][theirs];
    return score;
}

fs.readFile("/dev/AOC_22/day02/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const plays = data.split('\n');
    let totalscore = 0;
    for (let play of plays) {
        totalscore += calculateScore(play);
    }
    console.log(`Total score: ${totalscore}`);
});