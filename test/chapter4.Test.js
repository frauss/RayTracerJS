const Point = require('../point');
const Color = require('../color');
const Canvas =  require('../canvas');
const Matrix = require('../matrix');

describe('chapter 4 test exercise', () => {
    it('chapter 4 test exercise', done => {

        const canvasFilename = 'chapter4.ppm';

        let canvasWidth = 400;
        let canvasHeight = 400;
        let clockCanvas = new Canvas(canvasWidth, canvasHeight);
        let red = new Color(1, 0, 0);
        let radius = 150;
        let start = new Point(0, 1, 0);

        for (let hour = 1; hour <= 12; hour++) {
            const rotation = Matrix.rotation_z(hour * Math.PI / 6);
            const position = rotation.multiply(start);

            const x = Math.round((position.x * radius) + (canvasWidth / 2));
            const y = Math.round((position.y * radius) + (canvasWidth / 2));

            clockCanvas.writePixel(x, y, red);
            clockCanvas.writePixel(x + 1, y, red);
            clockCanvas.writePixel(x + 1, y + 1, red);
            clockCanvas.writePixel(x, y + 1, red);
        }
        clockCanvas.convertToPPM(canvasFilename, err => {
            if (err) {
                console.error(`Error writing file ${canvasFilename}: ${err}`);
            }
            done(err);
        });
    });
});