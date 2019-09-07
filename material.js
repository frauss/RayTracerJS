const Color = require('./color');

class Material {

    constructor(color, ambient, diffuse, specular, shininess) {
        this.color = color;
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
        this.shininess = shininess;
    }

    static default() {
        return new Material(new Color(1, 1, 1),
            .1, .9, .9, 200.0);
    }

    lighting(lightSource, position, eyeVector, normalVector) {

        // Combine the surface color with the light's color/intensity
        let effectiveColor = this.color.hadamardProduct(lightSource.intensity);

        // find the direction to the light source
        let lightVector = lightSource.position.subtract(position).normalize();

        // compute the ambient contribution
        let ambientColor = effectiveColor.scalarMultiply(this.ambient);

        // lightDotNormal represents the cosine of the angle between the
        // light vector and the normal vector. A negative number means the light
        // is on the other side of the surface
        let lightDotNormal = lightVector.dotProduct(normalVector);
        let diffuseColor, specularColor;
        if (lightDotNormal < 0) {
            diffuseColor = Color.black();
            specularColor = Color.black();
        }
        else {

            // compute the diffuse contribution
            diffuseColor = effectiveColor.scalarMultiply(this.diffuse).scalarMultiply(lightDotNormal);

            // reflectDotEye represents the cosine of the angle between the
            // reflection vector and the eye vector. A negative number means the
            // light reflects away from the eye
            let reflectVector = lightVector.negate().reflect(normalVector);
            let reflectDotEye = reflectVector.dotProduct(eyeVector);
            if (reflectDotEye <= 0) {
                specularColor = Color.black();
            }
            else {

                // compute the specular contribution
                let factor = Math.pow(reflectDotEye, this.shininess);
                specularColor = lightSource.intensity.scalarMultiply(this.specular).scalarMultiply(factor);
            }
        }

        // add the three contributions together to get the final shading
        return ambientColor.add(diffuseColor).add(specularColor);
    }
}

module.exports = (Material);