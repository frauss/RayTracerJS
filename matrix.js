const mathjs = require('mathjs');

class Matrix {

    constructor(data) {
        this.width = data[0].length;
        this.height = data.length;
        this.data = mathjs.matrix(data);
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
                    if (!this.valueEqual(rowIndex, columnIndex, matrixToCompare.valueAt(rowIndex, columnIndex)))
                        return false;
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

    multiply(matrix2) {
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
        const precision = 0.00001;
        return (Math.abs(this.valueAt(rowIndex, columnIndex) - valueToCompare) <= precision);
    };


}

module.exports = (Matrix);