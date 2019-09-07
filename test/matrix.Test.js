const chai = require('chai'),
    expect = chai.expect;

const Matrix = require('../matrix');
const Point = require('../point');
const Vector = require('../vector');
const RayTracerUtilities = require('../rayTracerUtilities');

describe('matrix tests', () => {

    describe('matrix creation', () => {
        it('create a 4x4 matrix', () => {
            let testMatrix = new Matrix([
                [1, 2, 3, 4],
                [5.5, 6.5, 7.5, 8.5],
                [9, 10, 11, 12],
                [13.5, 14.5, 15.5, 16.5]
            ]);
            expect(testMatrix.valueAt(0, 0)).to.equal(1);
            expect(testMatrix.valueAt(0, 3)).to.equal(4);
            expect(testMatrix.valueAt(1, 0)).to.equal(5.5);
            expect(testMatrix.valueAt(1, 2)).to.equal(7.5);
            expect(testMatrix.valueAt(2, 2)).to.equal(11);
            expect(testMatrix.valueAt(3, 0)).to.equal(13.5);
            expect(testMatrix.valueAt(3, 2)).to.equal(15.5);
        });

        it('create a 2x2 matrix', () => {
            let testMatrix = new Matrix(2, 2);
            expect(testMatrix.valueAt(0, 0)).to.equal(0);
            expect(testMatrix.valueAt(0, 1)).to.equal(0);
            expect(testMatrix.valueAt(1, 0)).to.equal(0);
            expect(testMatrix.valueAt(1, 1)).to.equal(0);
        });

        it('create a 3x3 matrix', () => {
            let testMatrix = new Matrix([
                [-3, 5, 0],
                [1, -2, -7],
                [0, 1, 1]
            ]);
            expect(testMatrix.valueAt(0, 0)).to.equal(-3);
            expect(testMatrix.valueAt(1, 1)).to.equal(-2);
            expect(testMatrix.valueAt(2, 2)).to.equal(1);
        });
    });

    describe('clone method', () => {
        it('clone a 2 x 2 matrix', () => {
            let testMatrix = new Matrix([
                [-3, 5],
                [1, -2]
            ]);
            let clonedMatrix = testMatrix.clone();
            expect(testMatrix.isEqual(clonedMatrix)).to.equal(true);
            clonedMatrix.setValue(1, 1, 12);
            expect(testMatrix.valueAt(1, 1)).to.equal(-2);
            expect(clonedMatrix.valueAt(1, 1)).to.equal(12);
        });
    });

    describe('matrix comparison', () => {
        it('create 2 equivalent 4x4 matrices', () => {
            let testRows = [
                [1, 2, 3, 4],
                [5.5, 6.5, 7.5, 8.5],
                [9, 10, 11, 12],
                [13.5, 14.5, 15.5, 16.5]
            ];
            let matrix1 = new Matrix(testRows);
            let matrix2 = new Matrix(testRows);
            expect(matrix1.isEqual(matrix2)).to.equal(true);
        });

        it('compare 2 non-equivalent 4x4 matrices', () => {
            let testRows = [
                [1, 2, 3, 4],
                [5.5, 6.5, 7.5, 8.5],
                [9, 10, 11, 12],
                [13.5, 14.5, 15.5, 16.5]
            ];
            let matrix1 = new Matrix(testRows);
            let clonedRows = JSON.parse(JSON.stringify(testRows));
            clonedRows[2][2] = -8;
            let matrix2 = new Matrix(clonedRows);
            expect(matrix1.isEqual(matrix2)).to.equal(false);
        });

        it('compare 2 differently dimensioned matrices', () => {
            let testRows = [
                [1, 2, 3, 4],
                [5.5, 6.5, 7.5, 8.5],
                [9, 10, 11, 12],
                [13.5, 14.5, 15.5, 16.5]
            ];
            let matrix1 = new Matrix(testRows);
            let matrix2 = new Matrix(testRows.slice(0, 2));
            expect(matrix1.isEqual(matrix2)).to.equal(false);
        });
    });

    describe('scalar multiplication', () => {
        it('multiply test matrix by 4', () => {
            let testRows = [
                [1, 2, 3],
                [3, 4, 5],
                [6, 7, 8]
            ];
            let factor = 4;
            let testMatrix = new Matrix(testRows);
            let resultantMatrix = testMatrix.scalarMultiply(factor);
            for (let columnIndex = 0; columnIndex < testMatrix.width; columnIndex++) {
                for (let rowIndex = 0; rowIndex < testMatrix.height; rowIndex++) {
                    expect(resultantMatrix.valueAt(rowIndex, columnIndex)).to.equal(testMatrix.valueAt(rowIndex, columnIndex) * factor);
                }
            }
        });
    });

    describe('matrix multiplication', () => {
        it('multiple 2 3 x 3 matrices', () => {
            let matrix1 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]);
            let matrix2 = new Matrix([
                [9, 8, 7],
                [6, 5, 4],
                [3, 2, 1]
            ]);
            let expectedResult = new Matrix([
                [30, 24, 18],
                [84, 69, 54],
                [138, 114, 90]
            ]);
            let resultantMatrix = matrix1.multiply(matrix2);
            expect(resultantMatrix.isEqual(expectedResult)).to.equal(true);
        });

        it('multiply 3 x 3 and 3 x 2 matrices', () => {
            let matrix1 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]);
            let matrix2 = new Matrix([
                [9, 8],
                [6, 5],
                [4, 3]
            ]);
            let expectedResult = new Matrix([
                [33, 27],
                [90, 75],
                [147, 123]
            ]);
            let resultantMatrix = matrix1.multiply(matrix2);
            expect(resultantMatrix.isEqual(expectedResult)).to.equal(true);
        });

        it('multiply 2 matrices where m1.width != m2.height', () => {
            let matrix1 = new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]);
            let matrix2 = new Matrix([
                [1, 2],
                [3, 4]
            ]);
            expect(() => {
                matrix1.multiply(matrix2);
            }).to.throw();
        });
    });
    
    describe('identity matrix generation', () => {
        let matrix1 = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        let matrix2 = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, 16]
        ]);
        let matrix3 = new Matrix([
            [9, 8],
            [6, 5],
            [4, 3]
        ]);
        let confirmIdentity = matrix => {
            for (let rowIndex = 0; rowIndex < matrix.height; rowIndex++) {
                for (let columnIndex = 0; columnIndex < matrix.width; columnIndex++) {
                    let value = matrix.valueAt(rowIndex, columnIndex);
                    if (rowIndex === columnIndex) {
                        expect(value).to.equal(1);
                    }
                    else {
                        expect(value).to.equal(0);
                    }
                }
            }
        };

        it('generate identity for 3 x 3 matrix', () => {
            let identityTest = matrix1.identity();
            confirmIdentity(identityTest);
        });

        it('generate identity for 4 x 4 matrix', () => {
            let identityTest = matrix2.identity();
            confirmIdentity(identityTest);
        });

        it('throw an error due to non-square matrix', () => {
            expect(() => {
                matrix3.identity();
            }).to.throw();
        });
    });

    describe('transposed matrix generation', () => {
        let matrix1 = new Matrix([
            [5, 4, 3],
            [4, 0, 4],
            [7, 10, 3]
        ]);
        let matrix1transposed = new Matrix([
            [5, 4, 7],
            [4, 0, 10],
            [3, 4, 3]
        ]);
        let matrix2 = new Matrix([
            [1, 2, 3, 4],
            [5, 6, 7, 8]
        ]);
        let matrix2transposed = new Matrix([
            [1, 5],
            [2, 6],
            [3, 7],
            [4, 8]
        ]);

        it('generate transposition for 3 x 3 matrix', () => {
            let transposeResult = matrix1.transpose();
            expect(transposeResult.isEqual(matrix1transposed)).to.equal(true);
        });

        it('generate transposition for 4 x 4 matrix', () => {
            let transposeResult = matrix2.transpose();
            expect(transposeResult.isEqual(matrix2transposed)).to.equal(true);
        });

        it('generate transpose of 3 x 3 identity matrix', () => {
            let identityMatrix = matrix1.identity();
            let transposeResult = identityMatrix.transpose();
            expect(transposeResult.isEqual(identityMatrix)).to.equal(true);
        })
    });

    describe('calculate determinant of 2 x 2 matrices', () => {
        it ('simple determinant calculation', () => {
            let matrix1 = new Matrix([
                [2, 5],
                [-3, 4]
            ]);
            let determinateResult = matrix1.determinant();
            expect(determinateResult).to.equal((2 * 4) - (5 * -3))
        });
    });

    describe('extract submatrices', () => {
        it('extract 2 x 2 submatrix from 3 x 3 original', () => {
            let testMatrix = new Matrix([
                [1, 5, 0],
                [-3, 2, 7],
                [0, 6, -3]
            ]);
            let expectResult = new Matrix([
                [-3, 2],
                [0, 6]
            ]);
            let resultMatrix = testMatrix.submatrix(0, 2);
            expect(resultMatrix.isEqual(expectResult)).to.equal(true);
        });

        it('extract 3 x 3 submatrix from 4 x 4 original', () => {
            let testMatrix = new Matrix([
                [-6, 1, 1, 6],
                [-8, 5, 8, 6],
                [-1, 0, 8, 2],
                [-7, 1, -1, 1]
            ]);
            let expectResult = new Matrix([
                [-6, 1, 6],
                [-8, 8, 6],
                [-7, -1, 1]
            ]);
            let resultMatrix = testMatrix.submatrix(2, 1);
            expect(resultMatrix.isEqual(expectResult)).to.equal(true);
        });
    });

    describe('minor of matrix', () => {
        it('calculate minor of a 3 x 3 matrix', () => {
            let testMatrix = new Matrix([
                [3, 5, 0],
                [2, -1, -7],
                [6, -1, 5]
            ]);
            let calculatedMinor = testMatrix.minor(1, 0);
            expect(calculatedMinor).to.equal(25);
        });
    });

    describe('cofactor of matrix', () => {
        let testMatrix = new Matrix([
            [3, 5, 0],
            [2, -1, -7],
            [6, -1, 5]
        ]);
        let calculatedMinor = testMatrix.cofactor(1, 0);
        expect(calculatedMinor).to.equal(-25);
        calculatedMinor = testMatrix.cofactor(2, 2);
        expect(calculatedMinor).to.equal(-13);
    });

    describe('chapter 3 tests', () => {
        it('perform tests of 3 x 3 matrix outlined on page 37', () => {
            let testMatrix = new Matrix([
                [1, 2, 6],
                [-5, 8, -4],
                [2, 6, 4]
            ]);
            expect(testMatrix.cofactor(0, 0)).to.equal(56);
            expect(testMatrix.cofactor(0, 1)).to.equal(12);
            expect(testMatrix.cofactor(0, 2)).to.equal(-46);
            expect(testMatrix.determinant()).to.equal(-196);
        });

        it('perform tests of 4 x 4 matrix outlined on page 37', () => {
            let testMatrix = new Matrix([
                [-2, -8, 3, 5],
                [-3, 1, 7, 3],
                [1, 2, -9, 6],
                [-6, 7, 7, -9]
            ]);
            expect(testMatrix.cofactor(0, 0)).to.equal(690);
            expect(testMatrix.cofactor(0, 1)).to.equal(447);
            expect(testMatrix.cofactor(0, 2)).to.equal(210);
            expect(testMatrix.cofactor(0, 3)).to.equal(51);
            expect(testMatrix.determinant()).to.equal(-4071);
        });
    });

    describe('invertability tests', () => {
        it('tests from page 39', () => {
            let testMatrix = new Matrix([
                [6, 4, 4, 4],
                [5, 5, 7, 6],
                [4, -9, 3, -7],
                [9, 1, 7, -6]
            ]);
            expect(testMatrix.determinant()).to.equal(-2120);
            expect(testMatrix.isInvertible()).to.equal(true);

            testMatrix = new Matrix([
                [-4, 2, -2, -3],
                [9, 6, 2, 6],
                [0, -5, 1, -5],
                [0, 0, 0, 0]
            ]);
            expect(testMatrix.determinant()).to.equal(0);
            expect(testMatrix.isInvertible()).to.equal(false);
        });
    });

    describe('inversion tests', () => {
        it('tests from page 39', () => {
            let testMatrix = new Matrix([
                [-5, 2, 6, -8],
                [1, -5, 1, 8],
                [7, 7, -6, -7],
                [1, -3, 7, 4]
            ]);
            let invertedMatrix = testMatrix.invert();
            expect(testMatrix.determinant()).to.equal(532);
            expect(testMatrix.cofactor(2, 3)).to.equal(-160);

            // Might consider using isEqual() method
            expect(invertedMatrix.valueAt(3, 2)).to.equal(-160/532);
            expect(testMatrix.cofactor(3, 2)).to.equal(105);

            // Might consider using isEqual() method
            expect(invertedMatrix.valueAt(2, 3)).to.equal(105/532);
            let expectedInvertedMatrix = new Matrix([
                [.21805, .45113, .24060, -.04511],
                [-.80827, -1.45677, -.44361, .52068],
                [-.07895, -.22368, -.05263, .19737],
                [-.52256, -.81391, -.30075, .30639]
            ]);
            expect(invertedMatrix.isEqual(expectedInvertedMatrix)).to.equal(true);
        });

        it('try to invert a matrix that cannott be inverted', () => {
            let testMatrix = new Matrix([
                [-4, 2, -2, -3],
                [9, 6, 2, 6],
                [0, -5, 1, -5],
                [0, 0, 0, 0]
            ]);
            expect(() => {
                testMatrix.invert();
            }).to.throw();
        });

        it('multiply a matrix by its inverse', () => {
            let matrix1 = new Matrix([
                [3, -9, 7, 3],
                [3, -8, 2, -9],
                [-4, 4, 4, 1],
                [-6, 5, -1, 1]
            ]);
            let matrix2 = new Matrix([
                [8, 2, 2, 2],
                [3, -1, 7, 0],
                [7, 0, 5, 4],
                [6, -2, 0, 5]
            ]);
            let productMatrix = matrix1.multiply(matrix2);
            let resultantMatrix = productMatrix.multiply(matrix2.invert());
            expect(resultantMatrix.isEqual(matrix1)).to.equal(true);
        });
    });

    describe('translation matrices', () => {
        it('create a translation matrix', () => {
            let x = 5;
            let y = -3;
            let z = 2;
            let translationMatrix = Matrix.translation(x, y, z);
            expect(translationMatrix.width).to.equal(4);
            expect(translationMatrix.height).to.equal(4);
            expect(translationMatrix.valueAt(0, 0)).to.equal(1);
            expect(translationMatrix.valueAt(3, 3)).to.equal(1);
            expect(translationMatrix.valueAt(0, 3)).to.equal(x);
            expect(translationMatrix.valueAt(1, 3)).to.equal(y);
            expect(translationMatrix.valueAt(2, 3)).to.equal(z);
        });

        it('multiply a translation matrix by a point', () => {
            let translationMatrix = Matrix.translation(5, -3, 2);
            let testPoint = new Point(-3, 4, 5);
            let resultantPoint = translationMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(resultantPoint.x).to.equal(2);
            expect(resultantPoint.y).to.equal(1);
            expect(resultantPoint.z).to.equal(7);
        });

        it('multiply a translation matrix by a vector', () => {
            let translationMatrix = Matrix.translation(5, -3, 2);
            let testVector = new Vector(-3, 4, 5);
            let resultantVector = translationMatrix.multiply(testVector);
            expect(resultantVector instanceof Vector).to.equal(true);
            expect(resultantVector.x).to.equal(-3);
            expect(resultantVector.y).to.equal(4);
            expect(resultantVector.z).to.equal(5);
        });
    });

    describe('scaling matrices', () => {
        it('create a scaling matrix', () => {
            let x = 2;
            let y = 3;
            let z = 4;
            let scalingMatrix = Matrix.scaling(x, y, z);
            expect(scalingMatrix.width).to.equal(4);
            expect(scalingMatrix.height).to.equal(4);
            expect(scalingMatrix.valueAt(0, 0)).to.equal(x);
            expect(scalingMatrix.valueAt(1, 1)).to.equal(y);
            expect(scalingMatrix.valueAt(2, 2)).to.equal(z);
            expect(scalingMatrix.valueAt(3, 3)).to.equal(1);
        });

        it('multiply a scaling matrix by a point', () => {
            let scalingMatrix = Matrix.scaling(2, 3, 4);
            let testPoint = new Point(-4, 6, 8);
            let resultantPoint = scalingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(resultantPoint.x).to.equal(-8);
            expect(resultantPoint.y).to.equal(18);
            expect(resultantPoint.z).to.equal(32);
        });

        it('multiply a scaling matrix by a vector', () => {
            let scalingMatrix = Matrix.scaling(2, 3, 4);
            let testVector = new Vector(-4, 6, 8);
            let resultantVector = scalingMatrix.multiply(testVector);
            expect(resultantVector instanceof Vector).to.equal(true);
            expect(resultantVector.x).to.equal(-8);
            expect(resultantVector.y).to.equal(18);
            expect(resultantVector.z).to.equal(32);
        });

        it('multiply by the inverse of a scaling matrix', () => {
            let scalingMatrix = Matrix.scaling(2, 3, 4);
            let invertedScalingMatrix = scalingMatrix.invert();
            let testVector = new Vector(-4, 6, 8);
            let resultantVector = invertedScalingMatrix.multiply(testVector);
            expect(resultantVector instanceof Vector).to.equal(true);
            expect(resultantVector.x).to.equal(-2);
            expect(resultantVector.y).to.equal(2);
            expect(resultantVector.z).to.equal(2);
        });

        it('test reflection by scaling by a negative value', () => {
            let scalingMatrix = Matrix.scaling(-1, 1, 1);
            let testPoint = new Point(2, 3, 4);
            let resultantPoint = scalingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(resultantPoint.x).to.equal(-2);
            expect(resultantPoint.y).to.equal(3);
            expect(resultantPoint.z).to.equal(4);
        });
    });

    describe('x axis rotation', () => {
        it('create an x axis rotation matrix', () => {
            let quarterRadians = Math.PI / 4;
            let quarterMatrix = Matrix.rotation_x(quarterRadians);
            expect(quarterMatrix.valueAt(0, 0)).to.equal(1);
            expect(quarterMatrix.valueAt(0, 3)).to.equal(0);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(1, 1), Math.cos(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(1, 2), -Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(2, 1), Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(2, 2), Math.cos(quarterRadians))).to.equal(true);
            expect(quarterMatrix.valueAt(3, 0)).to.equal(0);
            expect(quarterMatrix.valueAt(3, 3)).to.equal(1);
        });

        it('rotating a point around the x axis', () => {
            let testPoint = new Point(0, 1, 0);
            let halfQuarter = Matrix.rotation_x(Math.PI / 4);
            let fullQuarter = Matrix.rotation_x(Math.PI / 2);
            let resultantPoint = halfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, Math.sqrt(2) / 2)).to.equal(true);
            resultantPoint = fullQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 1)).to.equal(true);
        });

        it('ingerse of an x-rotation rotates in the opposite direction', () => {
            let testPoint = new Point(0, 1, 0);
            let halfQuarter = Matrix.rotation_x(Math.PI / 4);
            let invertedHalfQuarter = halfQuarter.invert();
            let resultantPoint = invertedHalfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, -Math.sqrt(2) / 2)).to.equal(true);
        });
    });

    describe('y axis rotation', () => {
        it('create an y axis rotation matrix', () => {
            let quarterRadians = Math.PI / 4;
            let quarterMatrix = Matrix.rotation_y(quarterRadians);
            expect(quarterMatrix.valueAt(1, 1)).to.equal(1);
            expect(quarterMatrix.valueAt(3, 3)).to.equal(1);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(0, 0), Math.cos(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(0, 2), Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(2, 0), -Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(2, 2), Math.cos(quarterRadians))).to.equal(true);
            expect(quarterMatrix.valueAt(0, 1)).to.equal(0);
            expect(quarterMatrix.valueAt(0, 3)).to.equal(0);
        });

        it('rotating a point around the y axis', () => {
            let testPoint = new Point(0, 0, 1);
            let halfQuarter = Matrix.rotation_y(Math.PI / 4);
            let fullQuarter = Matrix.rotation_y(Math.PI / 2);
            let resultantPoint = halfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, Math.sqrt(2) / 2)).to.equal(true);
            resultantPoint = fullQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);
        });

        it('inverse of an y-rotation rotates in the opposite direction', () => {
            let testPoint = new Point(0, 0, 1);
            let halfQuarter = Matrix.rotation_y(Math.PI / 4);
            let invertedHalfQuarter = halfQuarter.invert();
            let resultantPoint = invertedHalfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, -Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, Math.sqrt(2) / 2)).to.equal(true);
        });
    });

    describe('z axis rotation', () => {
        it('create an z axis rotation matrix', () => {
            let quarterRadians = Math.PI / 4;
            let quarterMatrix = Matrix.rotation_z(quarterRadians);
            expect(quarterMatrix.valueAt(2, 2)).to.equal(1);
            expect(quarterMatrix.valueAt(3, 3)).to.equal(1);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(0, 0), Math.cos(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(0, 1), -Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(1, 0), Math.sin(quarterRadians))).to.equal(true);
            expect(RayTracerUtilities.valueEqual(quarterMatrix.valueAt(1, 1), Math.cos(quarterRadians))).to.equal(true);
            expect(quarterMatrix.valueAt(0, 2)).to.equal(0);
            expect(quarterMatrix.valueAt(0, 3)).to.equal(0);
        });

        it('rotating a point around the z axis', () => {
            let testPoint = new Point(0, 1, 0);
            let halfQuarter = Matrix.rotation_z(Math.PI / 4);
            let fullQuarter = Matrix.rotation_z(Math.PI / 2);
            let resultantPoint = halfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, -Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);
            resultantPoint = fullQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, -1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);
        });

        it('inverse of an z-rotation rotates in the opposite direction', () => {
            let testPoint = new Point(0, 1, 0);
            let halfQuarter = Matrix.rotation_z(Math.PI / 4);
            let invertedHalfQuarter = halfQuarter.invert();
            let resultantPoint = invertedHalfQuarter.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, Math.sqrt(2) / 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);
        });
    });

    describe('shearing transformations', () => {
        it('moving x in proportion to y', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(1, 0, 0, 0, 0, 0);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 5)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 3)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 4)).to.equal(true);
        });

        it('moving x in proportion to z', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(0, 1, 0, 0, 0, 0);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 6)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 3)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 4)).to.equal(true);
        });

        it('moving y in proportion to x', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(0, 0, 1, 0, 0, 0);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 5)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 4)).to.equal(true);
        });

        it('moving y in proportion to z', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(0, 0, 0, 1, 0, 0);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 7)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 4)).to.equal(true);
        });

        it('moving z in proportion to x', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(0, 0, 0, 0, 1, 0);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 3)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 6)).to.equal(true);
        });

        it('moving z in proportion to y', () => {
            let testPoint = new Point(2, 3, 4);
            let shearingMatrix = Matrix.shearing(0, 0, 0, 0, 0, 1);
            let resultantPoint = shearingMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 2)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 3)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 7)).to.equal(true);
        });
    });

    describe('chaining transformations', () => {
        it('apply transformations in sequence', () => {
            let testPoint = new Point(1, 0, 1);
            let rotationMatrix = Matrix.rotation_x(Math.PI / 2);
            let scalingMatrix = Matrix.scaling(5, 5, 5);
            let translationMatrix = Matrix.translation(10, 5, 7);

            let resultantPoint = rotationMatrix.multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, -1)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);

            resultantPoint = scalingMatrix.multiply(resultantPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 5)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, -5)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 0)).to.equal(true);

            resultantPoint = translationMatrix.multiply(resultantPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 15)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 7)).to.equal(true);
        });

        it('apply transformations in sequence', () => {
            let testPoint = new Point(1, 0, 1);
            let rotationMatrix = Matrix.rotation_x(Math.PI / 2);
            let scalingMatrix = Matrix.scaling(5, 5, 5);
            let translationMatrix = Matrix.translation(10, 5, 7);

            let resultantPoint = translationMatrix.multiply(scalingMatrix).multiply(rotationMatrix).multiply(testPoint);
            expect(resultantPoint instanceof Point).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.x, 15)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.y, 0)).to.equal(true);
            expect(RayTracerUtilities.valueEqual(resultantPoint.z, 7)).to.equal(true);
        });
    });
});
