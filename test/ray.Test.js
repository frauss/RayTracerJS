const chai = require('chai'),
    expect = chai.expect;

const Ray = require('../ray');
const Point = require('../point');
const Vector = require('../vector');

describe('ray tests', () => {
    describe('constructor', () => {
        it('create a ray from a point and vector', () => {
            let testPoint = new Point(0, 0, 0);
            let testVector = new Vector(4, 5, 6);
            let testRay = new Ray(testPoint, testVector);
            expect(testRay.origin instanceof Point).to.equal(true);
            expect(testRay.origin.x).to.equal(testPoint.x);
            expect(testRay.origin.y).to.equal(testPoint.y);
            expect(testRay.origin.z).to.equal(testPoint.z);
            expect(testRay.direction instanceof Vector).to.equal(true);
            expect(testRay.direction.x).to.equal(testVector.x);
            expect(testRay.direction.y).to.equal(testVector.y);
            expect(testRay.direction.z).to.equal(testVector.z);
        });
    });

    describe('compute point from a distance', () => {
        it('compute point from distance', () => {
            let testPoint = new Point(2, 3, 4);
            let testVector = new Vector(1, 0, 0);
            let testRay = new Ray(testPoint, testVector);
            let resultantPoint = testRay.position(0);
            expect(resultantPoint.x).to.equal(2);
            expect(resultantPoint.y).to.equal(3);
            expect(resultantPoint.z).to.equal(4);
            resultantPoint = testRay.position(1);
            expect(resultantPoint.x).to.equal(3);
            expect(resultantPoint.y).to.equal(3);
            expect(resultantPoint.z).to.equal(4);
            resultantPoint = testRay.position(-1);
            expect(resultantPoint.x).to.equal(1);
            expect(resultantPoint.y).to.equal(3);
            expect(resultantPoint.z).to.equal(4);
            resultantPoint = testRay.position(2.5);
            expect(resultantPoint.x).to.equal(4.5);
            expect(resultantPoint.y).to.equal(3);
            expect(resultantPoint.z).to.equal(4);
        });
    });

    describe('subtract', () => {
        it('subtract 2 points', () => {
            let point1 = new Point(3, 4, 5);
            let point2 = new Point(4, 5, -6);
            let resultVector = point1.subtract(point2);
            expect(resultVector.x).to.equal(point1.x - point2.x);
            expect(resultVector.y).to.equal(point1.y - point2.y);
            expect(resultVector.z).to.equal(point1.z - point2.z);
            expect(resultVector instanceof Vector).to.equal(true);
        });

        it('subtract a vector from a points', () => {
            let testVector = new Vector(3, 4, 5);
            let testPoint = new Point(4, 5, -6);
            let resultVector = testPoint.subtract(testVector);
            expect(resultVector.x).to.equal(testPoint.x - testVector.x);
            expect(resultVector.y).to.equal(testPoint.y - testVector.y);
            expect(resultVector.z).to.equal(testPoint.z - testVector.z);
            expect(resultVector instanceof Point).to.equal(true);
        });
    });
});