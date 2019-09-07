class RayTracerUtilities {
    static valueEqual(value1, value2) {
        const precision = 0.00001;
        return (Math.abs(value1 - value2) <= precision);
    }
}
module.exports = (RayTracerUtilities);

