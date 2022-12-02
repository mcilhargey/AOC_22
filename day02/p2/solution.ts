import * as fs from 'fs';

const ShapeScore = {
    "X" : {"A":3, "B":1, "C":2},
    "Y" : {"A":1, "B":2, "C":3},
    "Z" : {"A":2, "B":3, "C":1}
};

const PlayScore = {
    "X" : 0,
    "Y" : 3,
    "Z" : 6
};

function calculateScore(play :string): number {
    let score = 0;
    const yours = play.charAt(2);
    const theirs = play.charAt(0);
    score = ShapeScore[yours][theirs] + PlayScore[yours];
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