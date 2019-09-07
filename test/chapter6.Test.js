const chai = require('chai'),
    expect = chai.expect;

const Point = require('../point');
const Vector = require('../vector');
const Matrix = require('../matrix');
const Sphere = require('../sphere');
const Color = require('../color');
const PointLight = require('../pointLight');
const Material = require('../material');
const RayTracerUtilities = require('../rayTracerUtilities');
const Ray = require('../ray');
const Canvas = require('../canvas');

describe('chapter 6 tests', () => {
    it('normal on a sphere at a point on the x axis', () => {
        let testSphere = new Sphere();
        let normalVector = testSphere.normalAt(new Point(1, 0, 0));
        expect(normalVector instanceof Vector).to.equal(true);
        expect(normalVector.x).to.equal(1);
        expect(normalVector.y).to.equal(0);
        expect(normalVector.z).to.equal(0);
    });

    it('normal on a sphere at a point on the y axis', () => {
        let testSphere = new Sphere();
        let normalVector = testSphere.normalAt(new Point(0, 1, 0));
        expect(normalVector instanceof Vector).to.equal(true);
        expect(normalVector.x).to.equal(0);
        expect(normalVector.y).to.equal(1);
        expect(normalVector.z).to.equal(0);
    });

    it('normal on a sphere at a point on the z axis', () => {
        let testSphere = new Sphere();
        let normalVector = testSphere.normalAt(new Point(0, 0, 1));
        expect(normalVector instanceof Vector).to.equal(true);
        expect(normalVector.x).to.equal(0);
        expect(normalVector.y).to.equal(0);
        expect(normalVector.z).to.equal(1);
    });

    it('normal on a sphere at a nonaxial point', () => {
        let testSphere = new Sphere();
        let pointValue = Math.sqrt(3) / 3;
        let normalVector = testSphere.normalAt(new Point(pointValue, pointValue, pointValue));
        expect(normalVector instanceof Vector).to.equal(true);
        let expectedVector = new Vector(pointValue, pointValue, pointValue).normalize();
        expect(normalVector.x).to.equal(expectedVector.x);
        expect(normalVector.y).to.equal(expectedVector.y);
        expect(normalVector.z).to.equal(expectedVector.z);
    });

    it('compute the normal on a translated sphere', () => {
        let testSphere = new Sphere();
        testSphere.setTransform(Matrix.translation(0, 1, 0));
        let normalVector = testSphere.normalAt(new Point(0, 1.70711, -.70711));
        expect(normalVector instanceof Vector).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.x, 0)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.y, .70711)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.z, -.70711)).to.equal(true);
    });

    it('compute the normal on a transformed sphere', () => {
        let testSphere = new Sphere();
        let transformMatrix = Matrix.scaling(1, .5, 1).multiply(Matrix.rotation_z(Math.PI / 5));
        testSphere.setTransform(transformMatrix);
        let normalVector = testSphere.normalAt(new Point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
        expect(normalVector instanceof Vector).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.x, 0)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.y, .97014)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(normalVector.z, -.24254)).to.equal(true);
    });

    it('reflecting a vector approaching at 45 degrees', () => {
        let inVector = new Vector(1, -1, 0);
        let normalVector = new Vector(0, 1, 0);
        let reflectedVector = inVector.reflect(normalVector);
        expect(reflectedVector instanceof Vector).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.x, 1)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.y, 1)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.z, 0)).to.equal(true);
    });

    it('reflecting a vector off a slanted surface', () => {
        let inVector = new Vector(0, -1, 0);
        let normalVector = new Vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        let reflectedVector = inVector.reflect(normalVector);
        expect(reflectedVector instanceof Vector).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.x, 1)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.y, 0)).to.equal(true);
        expect(RayTracerUtilities.valueEqual(reflectedVector.z, 0)).to.equal(true);
    });

    it('basic test of PointLight', () => {
        let intensity = new Color(1, 1, 1);
        let position = new Point(0, 0, 0);
        let testPointLight = new PointLight(position, intensity);
        expect(testPointLight.position.x).to.equal(position.x);
        expect(testPointLight.position.y).to.equal(position.y);
        expect(testPointLight.position.z).to.equal(position.z);
        expect(testPointLight.intensity.red).to.equal(intensity.red);
        expect(testPointLight.intensity.green).to.equal(intensity.green);
        expect(testPointLight.intensity.blue).to.equal(intensity.blue);
    });

    it('create default material', () => {
        let testMaterial = Material.default();
        expect(testMaterial.color.red).to.equal(1);
        expect(testMaterial.color.green).to.equal(1);
        expect(testMaterial.color.blue).to.equal(1);
        expect(testMaterial.ambient).to.equal(.1);
        expect(testMaterial.diffuse).to.equal(.9);
        expect(testMaterial.specular).to.equal(.9);
        expect(testMaterial.shininess).to.equal(200.0);
    });

    it('sphere with default material', () => {
        let testSphere = new Sphere();
        let testMaterial = testSphere.material;
        expect(testMaterial.color.red).to.equal(1);
        expect(testMaterial.color.green).to.equal(1);
        expect(testMaterial.color.blue).to.equal(1);
        expect(testMaterial.ambient).to.equal(.1);
        expect(testMaterial.diffuse).to.equal(.9);
        expect(testMaterial.specular).to.equal(.9);
        expect(testMaterial.shininess).to.equal(200.0);
    });

    it('sphere with assigned material', () => {
        let testMaterial = Material.default();
        testMaterial.ambient = 1;
        let testSphere = new Sphere();
        testSphere.material = testMaterial;
        expect(testMaterial.color.red).to.equal(1);
        expect(testMaterial.color.green).to.equal(1);
        expect(testMaterial.color.blue).to.equal(1);
        expect(testMaterial.ambient).to.equal(1);
        expect(testMaterial.diffuse).to.equal(.9);
        expect(testMaterial.specular).to.equal(.9);
        expect(testMaterial.shininess).to.equal(200.0);
    });

    describe('reflection tests', () => {
        let testMaterial = Material.default();
        let testPosition = new Point(0, 0, 0);

        it('Lighting with eye between the light and the surface', () => {
            let eyeVector = new Vector(0, 0, -1);
            let normalVector = new Vector(0, 0, -1);
            let testLight = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
            let testResult = testMaterial.lighting(testLight, testPosition, eyeVector, normalVector);
            expect(testResult instanceof Color).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.red, 1.9)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.blue, 1.9)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.green, 1.9)).to.equal(true);
        });

        it('Lighting with eye between the light and the surface, eye offset 45 degrees', () => {
            let eyeVector = new Vector(0, Math.sqrt(2)/2, Math.sqrt(2)/2);
            let normalVector = new Vector(0, 0, -1);
            let testLight = new PointLight(new Point(0, 0, -10), new Color(1, 1, 1));
            let testResult = testMaterial.lighting(testLight, testPosition, eyeVector, normalVector);
            expect(testResult instanceof Color).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.red, 1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.blue, 1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.green, 1)).to.equal(true);
        });

        it('Lighting with eye opposite surface, light offset 45 degrees', () => {
            let eyeVector = new Vector(0, 0, -1);
            let normalVector = new Vector(0, 0, -1);
            let testLight = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));
            let testResult = testMaterial.lighting(testLight, testPosition, eyeVector, normalVector);
            expect(testResult instanceof Color).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.red, .7364)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.blue, .7364)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.green, .7364)).to.equal(true);
        });

        it('Lighting with eye in path of the reflection vector', () => {
            let eyeVector = new Vector(0, -(Math.sqrt(2)/2), -(Math.sqrt(2)/2));
            let normalVector = new Vector(0, 0, -1);
            let testLight = new PointLight(new Point(0, 10, -10), new Color(1, 1, 1));
            let testResult = testMaterial.lighting(testLight, testPosition, eyeVector, normalVector);
            expect(testResult instanceof Color).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.red, 1.6364)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.blue, 1.6364)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.green, 1.6364)).to.equal(true);
        });

        it('Lighting with light behind the surface', () => {
            let eyeVector = new Vector(0, 0, -1);
            let normalVector = new Vector(0, 0, -1);
            let testLight = new PointLight(new Point(0, 0, 10), new Color(1, 1, 1));
            let testResult = testMaterial.lighting(testLight, testPosition, eyeVector, normalVector);
            expect(testResult instanceof Color).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.red, .1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.blue, .1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(testResult.green, .1)).to.equal(true);
        });
    });

    describe('chapter 6 final exercise', function () {
        this.timeout(60000);
        let canvasFilename = 'chapter6.ppm';
        it('should draw a 3d sphere on the canvas', () => {
            let rayOrigin = new Point(0, 0, -5);
            let wallZ = 10;
            let wallSize = 8;
            let canvasPixels = 100;
            let pixelSize = wallSize / canvasPixels;
            let halfWall = wallSize / 2;

            let testCanvas = new Canvas(canvasPixels, canvasPixels);
            let testSphere = new Sphere();
            testSphere.material = Material.default();
            testSphere.material.color = new Color(1, .2, 1);

            let lightPosition = new Point(-10, 10, -10);
            let lightColor = Color.white();
            let lightSource = new PointLight(lightPosition, lightColor);

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
                        let hitPoint = testRay.position(intersections[0].t);
                        let normal = intersections[0].object.normalAt(hitPoint);
                        let eyeVector = testRay.direction;
                        let pixelColor = testSphere.material.lighting(lightSource, hitPoint, eyeVector, normal);
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
