const chai = require('chai'),
    expect = chai.expect;

const Vector = require('../vector');
const Point = require('../point');
const Ray = require('../ray');
const Sphere = require('../sphere');

describe('sphere intersect tests', () => {
    it('intersect test 1', () => {
        let testRay = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        let intersects = testSphere.intersect(testRay);
        expect(intersects.length).to.equal(2);
        expect(intersects[0]).to.equal(4);
        expect(intersects[1]).to.equal(6);
    });

    it('intersects at a tangent', () => {
        let testRay = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        let intersects = testSphere.intersect(testRay);
        expect(intersects.length).to.equal(2);
        expect(intersects[0]).to.equal(5);
        expect(intersects[1]).to.equal(5);
    });

    it('does not intersect', () => {
        let testRay = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        let intersects = testSphere.intersect(testRay);
        expect(intersects.length).to.equal(0);
    });

    it('ray originates inside sphere', () => {
        let testRay = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        let intersects = testSphere.intersect(testRay);
        expect(intersects.length).to.equal(2);
        expect(intersects[0]).to.equal(-1);
        expect(intersects[1]).to.equal(1);
    });

    it('sphere is behind ray', () => {
        let testRay = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        let intersects = testSphere.intersect(testRay);
        expect(intersects.length).to.equal(2);
        expect(intersects[0]).to.equal(-6);
        expect(intersects[1]).to.equal(-4);
    });
});