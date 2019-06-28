const chai = require('chai'),
    expect = chai.expect;

const Color = require('../color');

describe('color tests', () => {
    describe('constructor', () => {
        it('create a black color', () => {
            let testColor = new Color(0, 0, 0);
            expect(testColor.red).to.equal(0);
            expect(testColor.green).to.equal(0);
            expect(testColor.blue).to.equal(0);
        });
    });

    describe('addition', () => {
        it('add 2 colors resulting in white', () => {
            let color1 = new Color(0.9, 0.6, 0.75);
            let color2 = new Color(0.7, 0.1, 0.25);
            let resultantColor = color1.add(color2);
            expect(resultantColor.red).to.equal(color1.red + color2.red);
            expect(resultantColor.green).to.equal(color1.green + color2.green);
            expect(resultantColor.blue).to.equal(color1.blue + color2.blue);
        });
    });

    describe('subtract', () => {
        it('subtract 2 points', () => {
            let color1 = new Color(0.9, 0.6, 0.75);
            let color2 = new Color(0.7, 0.1, 0.25);
            let resultantColor = color1.subtract(color2);
            expect(resultantColor.red).to.equal(color1.red - color2.red);
            expect(resultantColor.green).to.equal(color1.green - color2.green);
            expect(resultantColor.blue).to.equal(color1.blue - color2.blue);
        });
    });

    describe('scalarMultiply', () => {
        it('subtract 2 points', () => {
            let testColor = new Color(0.9, 0.6, 0.75);
            let factor = 3;
            let resultantColor = testColor.scalarMultiply(factor);
            expect(resultantColor.red).to.equal(testColor.red * factor);
            expect(resultantColor.green).to.equal(testColor.green * factor);
            expect(resultantColor.blue).to.equal(testColor.blue * factor);
        });
    });

    describe('hadamardProduct', () => {
        it('calculate hadamard product of 2 colors', () => {
            let color1 = new Color(0.9, 0.6, 0.75);
            let color2 = new Color(0.7, 0.1, 0.25);
            let resultantColor = color1.hadamardProduct(color2);
            expect(resultantColor.red).to.equal(color1.red * color2.red);
            expect(resultantColor.green).to.equal(color1.green * color2.green);
            expect(resultantColor.blue).to.equal(color1.blue * color2.blue);
        });
    });
});