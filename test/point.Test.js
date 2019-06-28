const chai = require('chai'),
    expect = chai.expect;

const Vector = require('../vector');
const Point = require('../point');

describe('point tests', () => {
    describe('constructor', () => {
        it('create a zeroed point', () => {
            let testPoint = new Point(0, 0, 0);
            expect(testPoint.x).to.equal(0);
            expect(testPoint.y).to.equal(0);
            expect(testPoint.z).to.equal(0);
        });
    });

    describe('addition', () => {
        it('add a vector to a point', () => {
            let testPoint = new Point(3, 4, 5);
            let testVector = new Vector(4, 5, -6);
            let resultPoint = testPoint.add(testVector);
            expect(resultPoint.x).to.equal(testPoint.x + testVector.x);
            expect(resultPoint.y).to.equal(testPoint.y + testVector.y);
            expect(resultPoint.z).to.equal(testPoint.z + testVector.z);
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