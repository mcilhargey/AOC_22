import * as fs from 'fs';

interface Location {
    x: number;
    y: number;
};

interface SensorDatum {
    sensor: Location;
    beacon: Location;
    distance: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
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

    const SensorData = data.split("\n");

    const Sensors:Array<SensorDatum> = [];
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
            distance: -1,
            minX: -1,
            maxX: -1,
            minY: -1,
            maxY: -1
        };
        sensorDatum.distance = manDistance(sensorDatum.sensor, sensorDatum.beacon);

        sensorDatum.minX = (sensorDatum.sensor.x - sensorDatum.distance);
        sensorDatum.maxX = (sensorDatum.sensor.x + sensorDatum.distance);
        sensorDatum.minY = (sensorDatum.sensor.y - sensorDatum.distance);
        sensorDatum.maxY = (sensorDatum.sensor.y + sensorDatum.distance);
        Sensors.push(sensorDatum);
    }

    const maxCoord = 4000000;


    let found = false;
    let position = {x: -1, y: -1};
    for (let i = 0; i < maxCoord; i++ && !found) {
        for (let j = 0; j < maxCoord; j++ && !found) {
            let inSensor = false;
            for (let sensor of Sensors) {
                let manD = manDistance(sensor.sensor, {x: i, y: j});
                if (manD <= sensor.distance) {
                    inSensor = true;
                    // move the scan to just outside the current beacon's y range
                    let manOffset = sensor.distance - manD;
                    if (sensor.sensor.y > j) {
                        j += (sensor.sensor.y - j) + manOffset;
                    }
                    else {
                        j += manOffset;
                    }
                    break;
                }
            }
            if (!inSensor) {
                position = {x: i, y: j};
                found = true;
            }
        }
    }

    console.log(`The frequency is ${position.x * maxCoord + position.y}`)
});