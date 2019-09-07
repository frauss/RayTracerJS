const chai = require('chai'),
    expect = chai.expect;

const Intersections = require('../intersections');
const Intersection = require('../intersection');
const Sphere = require('../sphere');

describe('intersections tests', () => {
    it('hit when all intersections have positive t', () => {
        let testSphere = new Sphere();
        let intersection1 = new Intersection(1, testSphere);
        let intersection2 = new Intersection(2, testSphere);
        let testIntersections = new Intersections(intersection1, intersection2);
        let testHit = testIntersections.hit();
        expect(testHit.t).to.equal(1);
        expect(testHit.object.id).to.equal(testSphere.id)
    });

    it('hit when some intersections have negative t', () => {
        let testSphere = new Sphere();
        let intersection1 = new Intersection(-1, testSphere);
        let intersection2 = new Intersection(1, testSphere);
        let testIntersections = new Intersections(intersection1, intersection2);
        let testHit = testIntersections.hit();
        expect(testHit.t).to.equal(1);
        expect(testHit.object.id).to.equal(testSphere.id)
    });

    it('all intersections have negative t', () => {
        let testSphere = new Sphere();
        let intersection1 = new Intersection(-2, testSphere);
        let intersection2 = new Intersection(-1, testSphere);
        let testIntersections = new Intersections(intersection1, intersection2);
        let testHit = testIntersections.hit();
        expect(testHit).to.be.null;
    });

    it('hit is always lowest non-negative t', () => {
        let testSphere = new Sphere();
        let intersection1 = new Intersection(5, testSphere);
        let intersection2 = new Intersection(7, testSphere);
        let intersection3 = new Intersection(-3, testSphere);
        let intersection4 = new Intersection(2, testSphere);
        let testIntersections = new Intersections(intersection1, intersection2, intersection3, intersection4);
        let testHit = testIntersections.hit();
        expect(testHit.t).to.equal(2);
        expect(testHit.object.id).to.equal(testSphere.id)
    });
});