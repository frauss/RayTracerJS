const uuid = require('uuid/v4');

const Point = require('./point');
const Intersection = require('./intersection');
const Intersections = require('./intersections');
const Matrix = require('./matrix');
const Material = require('./material');

class Sphere {

    constructor() {
        this.id = uuid();
        this.origin = new Point(0, 0, 0);
        this.transform = new Matrix(4, 4).identity();
    }

    intersect(r) {
        let returnValue = new Intersections();
        let translatedRay = r.transform(this.transform.invert());
        let sphereToRay = translatedRay.origin.subtract(this.origin);
        let a = translatedRay.direction.dotProduct(translatedRay.direction);
        let b = 2 * translatedRay.direction.dotProduct(sphereToRay);
        let c = sphereToRay.dotProduct(sphereToRay) - 1;
        let d = (b * b) - 4 * a * c;
        if (d >= 0) {
            returnValue.push(new Intersection((-b - Math.sqrt(d)) / (2 * a), this));
            returnValue.push(new Intersection((-b + Math.sqrt(d)) / (2 * a), this));
        }
        return returnValue;
    }

    setTransform(m) {
        this.transform = m;
    }

    normalAt(worldSpacePoint) {
        let objectSpacePoint = this.transform.invert().multiply(worldSpacePoint);
        let objectNormal = objectSpacePoint.subtract(new Point(0, 0, 0));
        let worldNormal = this.transform.invert().transpose().multiply(objectNormal);
        return worldNormal.normalize();
    }

    set material(m) {
        this._material = m;
    }

    get material() {
        return (this._material) ? this._material : Material.default();
    }
}

module.exports = (Sphere);