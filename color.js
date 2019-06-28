class Color {
    constructor(red, green, blue) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    add(colorToAdd) {
        let redSum = this.red + colorToAdd.red;
        let greenSum = this.green + colorToAdd.green;
        let blueSum = this.blue + colorToAdd.blue;
        return new Color(redSum, greenSum, blueSum);
    }

    subtract(colorToSubtract) {
        let redDiff = this.red - colorToSubtract.red;
        let greenDiff = this.green - colorToSubtract.green;
        let blueDiff = this.blue - colorToSubtract.blue;
        return new Color(redDiff, greenDiff, blueDiff);
    }

    scalarMultiply(factor) {
        let redProduct = this.red * factor;
        let greenProduct = this.green * factor;
        let blueProduct = this.blue * factor;
        return new Color(redProduct, greenProduct, blueProduct);
    }

    hadamardProduct(colorToMultiply) {
        let redProduct = this.red * colorToMultiply.red;
        let greenProduct = this.green * colorToMultiply.green;
        let blueProduct = this.blue * colorToMultiply.blue;
        return new Color(redProduct, greenProduct, blueProduct);
    }
}

module.exports = (Color);