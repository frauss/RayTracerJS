const chai = require('chai'),
    expect = chai.expect;

const Vector = require('../vector.js');
const Point = require('../point.js');

describe('vector tests', () => {
    describe('constructor', () => {
        it('create a zeroed vector', () => {
            let testVector = new Vector(0, 0, 0);
            expect(testVector.x).to.equal(0);
            expect(testVector.y).to.equal(0);
            expect(testVector.z).to.equal(0);
        });
    });

    describe('addition', () => {
        it('add 2 vectors', () => {
            let vector1 = new Vector(1, 1, 1);
            let vector2 = new Vector(2, -1, 0);
            let resultVector = vector1.add(vector2);
            expect(resultVector.x).to.equal(vector1.x + vector2.x);
            expect(resultVector.y).to.equal(vector1.y + vector2.y);
            expect(resultVector.z).to.equal(vector1.z + vector2.z);
        });

        it('add 2 vectors', () => {
            let vector1 = new Vector(3, 4, 5);
            let vector2 = new Vector(4, 5, -6);
            let resultVector = vector1.add(vector2);
            expect(resultVector.x).to.equal(vector1.x + vector2.x);
            expect(resultVector.y).to.equal(vector1.y + vector2.y);
            expect(resultVector.z).to.equal(vector1.z + vector2.z);
            expect(resultVector instanceof Vector).to.equal(true);
        });

        it('add a point to a vector', () => {
            let testPoint = new Point(3, 4, 5);
            let testVector = new Vector(4, 5, -6);
            let resultPoint = testVector.add(testPoint);
            expect(resultPoint.x).to.equal(testPoint.x + testVector.x);
            expect(resultPoint.y).to.equal(testPoint.y + testVector.y);
            expect(resultPoint.z).to.equal(testPoint.z + testVector.z);
            expect(resultPoint instanceof Point).to.equal(true);
        });
    });

    describe('subtract', () => {
        it('subtract 2 vectors', () => {
            let vector1 = new Vector(3, 4, 5);
            let vector2 = new Vector(4, 5, -6);
            let resultVector = vector1.subtract(vector2);
            expect(resultVector.x).to.equal(vector1.x - vector2.x);
            expect(resultVector.y).to.equal(vector1.y - vector2.y);
            expect(resultVector.z).to.equal(vector1.z - vector2.z);
        });
    });

    describe('negate', () => {
        it('negate a vector', () => {
            let testVector = new Vector(-1, 2, 3);
            let negatedVector = testVector.negate();
            expect(negatedVector.x).to.equal(-testVector.x);
            expect(negatedVector.y).to.equal(-testVector.y);
            expect(negatedVector.z).to.equal(-testVector.z);
        });
    });

    describe('scalar multiply', () => {
        it('multiply a Vector', () => {
            let testVector = new Vector(1, 2, -3);
            let factor = 3.5;
            let multipliedVector = testVector.multiply(factor);
            expect(multipliedVector.x).to.equal(testVector.x * factor);
            expect(multipliedVector.y).to.equal(testVector.y * factor);
            expect(multipliedVector.z).to.equal(testVector.z * factor);
            expect(multipliedVector.type).to.equal(testVector.type);
        });
    });

    describe('scalar divide', () => {
        it('divide a vector', () => {
            let testVector = new Vector(1, 2, -3);
            let divisor = 4;
            let dividedVector = testVector.divide(divisor);
            expect(dividedVector.x).to.equal(testVector.x / divisor);
            expect(dividedVector.y).to.equal(testVector.y / divisor);
            expect(dividedVector.z).to.equal(testVector.z / divisor);
            expect(dividedVector.type).to.equal(testVector.type);
        });
    });

    describe('vector magnitude', () => {
        it('get magnitude of vector', () => {
            let testVector = new Vector(1, 2, -3);
            let magnitude = testVector.magnitude();
            let expectedValue = Math.sqrt((testVector.x * testVector.x) +
                (testVector.y * testVector.y) +
                (testVector.z * testVector.z));
            expect(magnitude).to.equal(expectedValue);
        });
    });

    describe('vector normalize', () => {
        it('normalize 2 vectors', () => {
            let testVector = new Vector(1, 2, -3);
            let normalizedVector = testVector.normalize();
            expect(normalizedVector.x).to.equal(testVector.x / testVector.magnitude());
            expect(normalizedVector.y).to.equal(testVector.y / testVector.magnitude());
            expect(normalizedVector.z).to.equal(testVector.z / testVector.magnitude());
        });
    });

    describe('vector dot product', () => {
        it('calculate the dot product of 2 vectors', () => {
            let vector1 = new Vector(1, 2, -3);
            let vector2 = new Vector(6, 2.7, -4);
            let resultantProduct = vector1.dotProduct(vector2);
            let expectedValue = (vector1.x * vector2.x) +
                (vector1.y * vector2.y) +
                (vector1.z * vector2.z);
            expect(resultantProduct).to.equal(expectedValue);
        });
    });

    describe('vector cross product', () => {
        it('calculate the cross product of 2 vectors', () => {
            let vector1 = new Vector(1, 2, -3);
            let vector2 = new Vector(6, 2.7, -4);
            let resultantProduct = vector1.crossProduct(vector2);
            expect(resultantProduct.x).to.equal((vector1.y * vector2.z) - (vector1.z * vector2.y));
            expect(resultantProduct.y).to.equal((vector1.z * vector2.x) - (vector1.x * vector2.z));
            expect(resultantProduct.z).to.equal((vector1.x * vector2.y) - (vector1.y * vector2.x));
        });
    });
});