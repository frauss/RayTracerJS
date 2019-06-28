class Vector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    add(objectToAdd) {
        const Point = require('./point');
        let xSum = this.x + objectToAdd.x;
        let ySum = this.y + objectToAdd.y;
        let zSum = this.z + objectToAdd.z;
        if (objectToAdd instanceof Point) {
            return new Point(xSum, ySum, zSum);
        }
        else if (objectToAdd instanceof Vector)
            return new Vector(xSum, ySum, zSum);
    }

    subtract(objectToSubtract) {
        let xDiff = this.x - objectToSubtract.x;
        let yDiff = this.y - objectToSubtract.y;
        let zDiff = this.z - objectToSubtract.z;
        return new Vector(xDiff, yDiff, zDiff);
    }

    negate() {
        return new Vector(-this.x, -this.y, -this.z);
    }

    magnitude() {
        return Math.sqrt((this.x * this.x) +
            (this.y * this.y) +
            (this.z * this.z));
    }

    multiply(factor) {

        // Modify object or return new?
        return new Vector(this.x * factor, this.y * factor, this.z * factor);
    }

    divide(divisor) {

        // Modify object or return new?
        return new Vector(this.x / divisor, this.y / divisor, this.z / divisor);
    }

    normalize() {
        let divisor = this.magnitude();
        return new Vector(
            (this.x / divisor),
            (this.y / divisor),
            (this.z / divisor));
    }

    dotProduct(productVector) {
        return (this.x * productVector.x) +
            (this.y * productVector.y) +
            (this.z * productVector.z);
    }

    crossProduct(productVector) {
        return new Vector((this.y * productVector.z) - (this.z * productVector.y),
            (this.z * productVector.x) - (this.x * productVector.z),
            (this.x * productVector.y) - (this.y * productVector.x));
    }
}

module.exports = (Vector);
