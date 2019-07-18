const chai = require('chai'),
    expect = chai.expect;

const Canvas = require('../canvas');
const Color = require('../color');

describe('canvas tests', () => {
    let canvasHeight = 5;
    let canvasWdith = 5;

    describe('constructor', () => {
        it('create a canvas and confirm all pixels are black', () => {
            let testCanvas = new Canvas(canvasWdith, canvasHeight);
            expect(testCanvas.width).to.equal(canvasWdith);
            expect(testCanvas.height).to.equal(canvasHeight);
            for (let row = 0; row < canvasHeight; row++) {
                for (let column = 0; column < canvasWdith; column++) {
                    expect(testCanvas.pixelAt(column, row).red).to.equal(0);
                    expect(testCanvas.pixelAt(column, row).green).to.equal(0);
                    expect(testCanvas.pixelAt(column, row).blue).to.equal(0);
                }
            }
        });
    });

    describe('writePixel and pixelAt', () => {
        it('test writePixel and pixelAt methods by setting 3 pixels on canvas to red, green and blue and confirming', () => {
            let red = new Color(1, 0, 0);
            let green = new Color(0, 1, 0);
            let blue = new Color(0, 0, 1);
            let testCanvas = new Canvas(canvasWdith, canvasHeight);
            let testColor = red;
            testCanvas.writePixel(0, 0, testColor);
            expect(testCanvas.pixelAt(0, 0).red).to.equal(testColor.red);
            expect(testCanvas.pixelAt(0, 0).green).to.equal(testColor.green);
            expect(testCanvas.pixelAt(0, 0).blue).to.equal(testColor.blue);
            testColor = green;
            testCanvas.writePixel(1, 0, testColor);
            expect(testCanvas.pixelAt(1, 0).red).to.equal(testColor.red);
            expect(testCanvas.pixelAt(1, 0).green).to.equal(testColor.green);
            expect(testCanvas.pixelAt(1, 0).blue).to.equal(testColor.blue);
            testColor = blue;
            testCanvas.writePixel(0, 1, testColor);
            expect(testCanvas.pixelAt(0, 1).red).to.equal(testColor.red);
            expect(testCanvas.pixelAt(0, 1).green).to.equal(testColor.green);
            expect(testCanvas.pixelAt(0, 1).blue).to.equal(testColor.blue);
        });
    });

    describe('convertToPPM', () => {
        let red = new Color(1, 0, 0);
        let green = new Color(0, 1, 0);
        let blue = new Color(0, 0, 1);

        let testCanvas = new Canvas(canvasWdith, canvasHeight);
        testCanvas.writePixel(0, 0, red);
        testCanvas.writePixel(2, 2, green);
        testCanvas.writePixel(4, 4, blue);

        it('save canvas as ppm file', done => {
            let ppmFile = 'testPPMFile.ppm';
            testCanvas.convertToPPM(ppmFile, err => {
                if (err) {
                    console.error(`Error writing file ${ppmFile}: ${err}`);
                }
                done(err);
            });
        });

        it('save canvas with bad filename', done => {
            let badPPMFile = 'boguspath/with\\bad/testPPMFile.ppm';
            expect(() => {
                testCanvas.convertToPPM(badPPMFile, err => {
                    if (err) {
                        throw new Error(`Error writing file ${badPPMFile}: ${err}`);
                    }
                    done(err);
                });
            }).to.throw();
        });
    });
});