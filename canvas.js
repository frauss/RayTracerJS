const fs = require('fs');
const util = require('util');

const Color = require('./color');

function scalePixel(colorValue, maxColorValue) {
    return Math.floor(colorValue * maxColorValue);
}

class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = [];
        for (let column = 0; column < width; column++) {
            let newColumn = [];
            for (let row = 0; row < height; row++) {
                newColumn.push(new Color(0, 0, 0));
            }
            this.pixels.push(newColumn);
        }
    }

    pixelAt(column, row) {
        return this.pixels[column][row];
    }

    writePixel(column, row, pixelColor) {
        this.pixels[column][row] = pixelColor;
    }

    convertToPPM(savePath, callback) {
        let maxColor = 255;
        let ppmHeader = `P3\n${this.width} ${this.height}\n${maxColor}\n`;
        let ppmPixels = [];
        for (let row = 0; row < this.height; row++) {
            for (let column = 0; column < this.width; column++) {
                let pixelText = util.format('%d %d %d',
                    scalePixel(this.pixels[column][row].red, maxColor),
                    scalePixel(this.pixels[column][row].green, maxColor),
                    scalePixel(this.pixels[column][row].blue, maxColor));
                ppmPixels.push(pixelText);
            }
        }

        let writeStream = fs.createWriteStream(savePath);
        writeStream.write(ppmHeader);
        ppmPixels.forEach(value => writeStream.write(`${value}\n`));

        // the finish event is emitted when all data has been flushed from the stream
        writeStream.on('finish', () => {
            callback(null);
        });

        // handle the errors on the write process
        writeStream.on('error', (err) => {
            callback(err);
        });

        // close the stream
        writeStream.end();
    }
}

module.exports = (Canvas);