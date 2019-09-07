const chai = require('chai'),
    expect = chai.expect;

const Point = require('../point');
const Vector = require('../vector');
const Ray = require('../ray');
const Matrix = require('../matrix');
const Sphere = require('../sphere');
const Canvas = require('../canvas');
const Color = require('../color');

describe('chapter 5 tests', function () {
    it('translating a ray', () => {
        let testRay = new Ray(new Point(1,2, 3), new Vector(0, 1, 0));
        let translationMatrix = Matrix.translation(3, 4, 5);
        let resultantRay = testRay.transform(translationMatrix);
        expect(resultantRay.origin.x).to.equal(4);
        expect(resultantRay.origin.y).to.equal(6);
        expect(resultantRay.origin.z).to.equal(8);
        expect(resultantRay.direction.x).to.equal(0);
        expect(resultantRay.direction.y).to.equal(1);
        expect(resultantRay.direction.z).to.equal(0);
    });

    it('scaling a ray', () => {
        let testRay = new Ray(new Point(1,2, 3), new Vector(0, 1, 0));
        let translationMatrix = Matrix.scaling(2, 3, 4);
        let resultantRay = testRay.transform(translationMatrix);
        expect(resultantRay.origin.x).to.equal(2);
        expect(resultantRay.origin.y).to.equal(6);
        expect(resultantRay.origin.z).to.equal(12);
        expect(resultantRay.direction.x).to.equal(0);
        expect(resultantRay.direction.y).to.equal(3);
        expect(resultantRay.direction.z).to.equal(0);
    });

    it('set a transform on a sphere', () => {
        let testSphere = new Sphere();
        let testTranslation = Matrix.translation(2, 3, 4);
        testSphere.setTransform(testTranslation);
        expect(testSphere.transform.isEqual(testTranslation)).to.equal(true);
    });

    it('intersecting scaled sphere with ray', () => {
        let testRay = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        testSphere.setTransform(Matrix.scaling(2, 2, 2));
        let testIntersect = testSphere.intersect(testRay);
        expect(testIntersect.length).to.equal(2);
        expect(testIntersect[0].t).to.equal(3);
        expect(testIntersect[1].t).to.equal(7);
    });

    it('intersecting translated sphere with a ray', () => {
        let testRay = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1));
        let testSphere = new Sphere();
        testSphere.setTransform(Matrix.translation(5, 0, 0));
        let testIntersect = testSphere.intersect(testRay);
        expect(testIntersect.length).to.equal(0);
    });

    describe('chapter 5 final exercise', function () {
        this.timeout(60000);
        let canvasFilename = 'chapter5.ppm';
        it('should draw a sphere on the canvas', () => {
            let rayOrigin = new Point(0, 0, -5);
            let wallZ = 10;
            let wallSize = 8;
            let canvasPixels = 100;
            let pixelSize = wallSize / canvasPixels;
            let halfWall = wallSize / 2;

            let testCanvas = new Canvas(canvasPixels, canvasPixels);
            let pixelColor = new Color(1, 0, 0);
            let testSphere = new Sphere();

            for (let y = 0; y < canvasPixels; y++) {
                let worldY = halfWall - pixelSize * y;
                for (let x = 0; x < canvasPixels; x++) {
                    let worldX = halfWall - pixelSize * x;
                    let canvasPosition = new Point(worldX, worldY, wallZ);
                    let resultantPoint = canvasPosition.subtract(rayOrigin);
                    let normalizedVector = new Vector(resultantPoint.x, resultantPoint.y, resultantPoint.z).normalize();
                    let testRay = new Ray(rayOrigin, normalizedVector);
                    let intersections = testSphere.intersect(testRay);
                    if (intersections.hit()) {
                        testCanvas.writePixel(x, y, pixelColor);
                    }
                }
            }
            testCanvas.convertToPPM(canvasFilename, err => {
                if (err) {
                    console.error(`Error writing file ${canvasFilename}: ${err}`);
                }
                process.exit(0);
            });
        });
    });
});

