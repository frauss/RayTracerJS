class Ray {

    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }

    position(t) {
        return this.origin.add(this.direction.multiply(t));
    }

    transform(m) {
        let resultantOrigin = m.multiply(this.origin);
        let resultantDirection = m.multiply(this.direction);
        return new Ray(resultantOrigin, resultantDirection);
    }
}

module.exports = (Ray);