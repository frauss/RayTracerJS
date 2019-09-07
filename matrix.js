const mathjs = require('mathjs');

const Point = require('./point');
const Vector = require('./vector');
const RayTracerUtilities = require('./rayTracerUtilities');

class Matrix {

    constructor() {

        // See if width and height are specified in constructor
        if (arguments.length === 2) {
            this.width = arguments[0];
            this.height = arguments[1];
            let initialData = Array.from(Array(this.height).fill(0), () => new Array(this.width).fill(0));
            this.data = mathjs.matrix(initialData);
        }

        // Otherwise assume an array of arrays
        else {
            this.width = arguments[0][0].length;
            this.height = arguments[0].length;
            this.data = mathjs.matrix(arguments[0]);
        }
    }

    valueAt(row, column) {
        let thisIndex = mathjs.index(row, column);
        return this.data.subset(thisIndex);
    }

    setValue(row, column, value) {
        this.data.subset(mathjs.index(row, column), value);
    }

    clone() {
        let resultantMatrix = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            let resultantRow = [];
            for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                resultantRow.push(this.valueAt(rowIndex, columnIndex));
            }
            resultantMatrix.push(resultantRow);
        }
        return new Matrix(resultantMatrix);
    }

    isEqual(matrixToCompare) {
        if (this.width !== matrixToCompare.width ||
            this.height !== matrixToCompare.height)
            return false;
        else {
            for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
                for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                    let comparisonResult = this.valueEqual(rowIndex, columnIndex, matrixToCompare.valueAt(rowIndex, columnIndex));
                    if (!comparisonResult)
                        return comparisonResult;
                }
            }
            return true;
        }
    }

    scalarMultiply(factor) {
        let resultantMatrix = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            let resultantRow = [];
            for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                resultantRow.push(this.valueAt(rowIndex, columnIndex) * factor);
            }
            resultantMatrix.push(resultantRow);
        }
        return new Matrix(resultantMatrix);
    }

    multiply() {
        if (arguments[0] instanceof Matrix) {
            let matrix2 = arguments[0];
            if (this.width !== matrix2.height) {
                throw new Error(`Matrix (${this.width}) must have the same # of columns as Matrix 2 (${matrix2.height} has rows`);
            }
            else {
                let resultantMatrix = [];
                for (let i = 0; i < this.height; i++) {
                    let resultantRow = [];
                    for (let j = 0; j < matrix2.width; j++) {
                        let cellSum = 0;
                        for (let k = 0; k < matrix2.height; k++) {
                            cellSum += this.valueAt(i, k) * matrix2.valueAt(k, j);
                        }
                        resultantRow.push(cellSum);
                    }
                    resultantMatrix.push(resultantRow);
                }
                return new Matrix(resultantMatrix);
            }
        }
        else if (arguments[0] instanceof Point) {
            let pointMatrix = new Matrix([
                [arguments[0].x],
                [arguments[0].y],
                [arguments[0].z],
                [1]
            ]);
            let productMatrix = this.multiply(pointMatrix);
            return new Point(productMatrix.valueAt(0, 0),
                productMatrix.valueAt(1, 0),
                productMatrix.valueAt(2, 0));
        }
        else if (arguments[0] instanceof Vector) {
            let vectorMatrix = new Matrix([
                [arguments[0].x],
                [arguments[0].y],
                [arguments[0].z],
                [0]
            ]);
            let productMatrix = this.multiply(vectorMatrix);
            return new Vector(productMatrix.valueAt(0, 0),
                productMatrix.valueAt(1, 0),
                productMatrix.valueAt(2, 0));
        }
    }

    identity() {
        if (this.width !== this.height) {
            throw new Error('Can not generate identity matrix for non-square matrix');
        }
        else {
            let resultantMatrix = [];
            for (let rowIndex = 0; rowIndex < this.height; rowIndex += 1){
                let resultantRow = [];
                for(let columnIndex = 0; columnIndex < this.width; columnIndex += 1) {
                    resultantRow.push((rowIndex === columnIndex) ? 1 : 0);
                }
                resultantMatrix.push(resultantRow);
            }
            return new Matrix(resultantMatrix);
        }
    }

    transpose() {
        let resultantMatrix = [];
        for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
            let resultantRow = [];
            for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
                resultantRow.push(this.valueAt(rowIndex, columnIndex));
            }
            resultantMatrix.push(resultantRow);
        }
        return new Matrix(resultantMatrix);
    }

    determinant() {
        let result = 0;
        if (this.height === 2) {
            return ((this.valueAt(0, 0) * this.valueAt(1, 1)) -
                (this.valueAt(0, 1) * this.valueAt(1, 0)));
        }
        else {
            for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                result += this.valueAt(0, columnIndex) * this.cofactor(0, columnIndex);
            }
        }
        return result;
    }

    submatrix(rowToRemove, columnToRemove) {
        let resultantMatrix = [];
        for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
            if (rowIndex !== rowToRemove) {
                let resultantRow = [];
                for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                    if (columnIndex !== columnToRemove) {
                        resultantRow.push(this.valueAt(rowIndex, columnIndex));
                    }
                }
                resultantMatrix.push(resultantRow);
            }
        }
        return new Matrix(resultantMatrix);
    }

    minor(rowToRemove, columnToRemove) {
        let minorMatrix = this.submatrix(rowToRemove, columnToRemove);
        return minorMatrix.determinant();
    }

    cofactor(rowToRemove, columnToRemove) {
        let initialMinor = this.minor(rowToRemove, columnToRemove);
        return ((rowToRemove + columnToRemove) % 2 === 0) ?
            initialMinor : -initialMinor;
    }

    isInvertible() {
        return (this.determinant() !== 0);
    }

    invert() {
        if (this.isInvertible()) {
            let resultantMatrix = [];
            let ourDeterminant = this.determinant();
            for (let columnIndex = 0; columnIndex < this.width; columnIndex++) {
                let resultantRow = [];
                for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
                    let cofactor = this.cofactor(rowIndex, columnIndex);
                    resultantRow.push(cofactor / ourDeterminant);
                }
                resultantMatrix.push(resultantRow);
            }
            return new Matrix(resultantMatrix);
        }
        else {
            throw new Error('Matrix is not invertible.');
        }
    }

    valueEqual(rowIndex, columnIndex, valueToCompare) {
        return RayTracerUtilities.valueEqual(this.valueAt(rowIndex, columnIndex), valueToCompare);
    };

    static translation(x, y, z) {
        let translationMatrix = new Matrix(4, 4).identity();
        translationMatrix.setValue(0, 3, x);
        translationMatrix.setValue(1, 3, y);
        translationMatrix.setValue(2, 3, z);
        return translationMatrix;
    }

    static scaling(x, y, z) {
        let scalingMatrix = new Matrix(4, 4).identity();
        scalingMatrix.setValue(0, 0, x);
        scalingMatrix.setValue(1, 1, y);
        scalingMatrix.setValue(2, 2, z);
        return scalingMatrix;
    }

    static rotation_x(r) {
        let rotationMatrix = new Matrix(4, 4).identity();
        let sinValue = Math.sin(r);
        let cosValue = Math.cos(r);
        rotationMatrix.setValue(1, 1, cosValue);
        rotationMatrix.setValue(1, 2, -sinValue);
        rotationMatrix.setValue(2, 1, sinValue);
        rotationMatrix.setValue(2, 2, cosValue);
        return rotationMatrix;
    }

    static rotation_y(r) {
        let rotationMatrix = new Matrix(4, 4).identity();
        let sinValue = Math.sin(r);
        let cosValue = Math.cos(r);
        rotationMatrix.setValue(0, 0, cosValue);
        rotationMatrix.setValue(2, 0, -sinValue);
        rotationMatrix.setValue(0, 2, sinValue);
        rotationMatrix.setValue(2, 2, cosValue);
        return rotationMatrix;
    }

    static rotation_z(r) {
        let rotationMatrix = new Matrix(4, 4).identity();
        let sinValue = Math.sin(r);
        let cosValue = Math.cos(r);
        rotationMatrix.setValue(0, 0, cosValue);
        rotationMatrix.setValue(0, 1, -sinValue);
        rotationMatrix.setValue(1, 0, sinValue);
        rotationMatrix.setValue(1, 1, cosValue);
        return rotationMatrix;
    }

    static shearing(xy, xz, yx, yz, zx, zy) {
        let shearingMatrix = new Matrix(4, 4).identity();
        shearingMatrix.setValue(0, 1, xy);
        shearingMatrix.setValue(0, 2, xz);
        shearingMatrix.setValue(1, 0, yx);
        shearingMatrix.setValue(1, 2, yz);
        shearingMatrix.setValue(2, 0, zx);
        shearingMatrix.setValue(2, 1, zy);
        return shearingMatrix;
    }
}

module.exports = (Matrix);