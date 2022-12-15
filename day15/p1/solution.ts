import * as fs from 'fs';

interface Location {
    x: number;
    y: number;
};

interface SensorDatum {
    sensor: Location;
    beacon: Location;
    distance: number;
};

const ParseRegEx = /^Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/;

function manDistance(point1: Location, point2: Location): number {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}

fs.readFile("/dev/AOC_22/day15/p1/input.data", 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //const SensorRow = 10;
    const SensorRow = 2000000;
    const SensorData = data.split("\n");

    const Sensors:Array<SensorDatum> = [];
    let minX = null;
    let maxX = null;
    for (let line of SensorData) {
        let parts = ParseRegEx.exec(line);
        let sensorDatum = {
            sensor: {
                x: parseInt(parts[1],10),
                y: parseInt(parts[2],10)
            },
            beacon: {
                x: parseInt(parts[3],10),
                y: parseInt(parts[4],10)
            },
            distance: -1
        };
        sensorDatum.distance = manDistance(sensorDatum.sensor, sensorDatum.beacon);
        Sensors.push(sensorDatum);

        let minSensorX = (sensorDatum.sensor.x - sensorDatum.distance) + Math.abs(SensorRow - sensorDatum.sensor.y);
        minX = minX === null ? minSensorX : Math.min(minX, minSensorX);
        let maxSensorX = (sensorDatum.sensor.x + sensorDatum.distance) - Math.abs(SensorRow - sensorDatum.sensor.y);
        maxX = maxX === null ? maxSensorX : Math.max(maxX, maxSensorX);
    }

    let possibleExclusions: Set<number> = new Set();

    console.log(`Checking between ${minX} and ${maxX}`);

    for (let sensor of Sensors) {
        for (let i = minX; i < maxX; i++) {
            if (manDistance(sensor.sensor, {x:i, y: SensorRow}) <= sensor.distance) {
                if (!possibleExclusions.has(i)) {
                    possibleExclusions.add(i);
                }
            }
        }
    }

    console.log(`There are ${possibleExclusions.size} exclusions`)
});