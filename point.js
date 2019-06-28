class Point {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(vectorToAdd) {
        let xSum = this.x + vectorToAdd.x;
        let ySum = this.y + vectorToAdd.y;
        let zSum = this.z + vectorToAdd.z;
        return new Point(xSum, ySum, zSum);
    }

    subtract(objectToSubtract) {
        const Vector = require('./vector');
        let xDiff = this.x - objectToSubtract.x;
        let yDiff = this.y - objectToSubtract.y;
        let zDiff = this.z - objectToSubtract.z;
        if (objectToSubtract instanceof Vector)
            return new Point(xDiff, yDiff, zDiff);
        else if (objectToSubtract instanceof Point)
            return new Vector(xDiff, yDiff, zDiff);
    }
}

module.exports = (Point);