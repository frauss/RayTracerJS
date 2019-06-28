const Point = require('../point');
const Vector = require('../vector');
const Color = require('../color');
const Canvas =  require('../canvas');

function tick(environment, projectile) {
    let newPosition = projectile.position.add(projectile.velocity);
    let newVelocity = projectile.velocity.add(environment.gravity.add(environment.wind));
    return {
        position: newPosition,
        velocity: newVelocity
    };
}

let myProjectile = {
    position: new Point(0, 1, 0),
    velocity: new Vector(1, 1.8, 0).normalize().multiply(11.25)
};

let myEnvironment = {
    gravity: new Vector(0, -0.1, 0),
    wind: new Vector(-0.01, 0, 0)
};

let canvasWidth = 900;
let canvasHeight = 550;
let myCanvas = new Canvas(canvasWidth, canvasHeight);
let red = new Color(1, 0, 0);

let tickCount = 1;
let scaledX = Math.floor(myProjectile.position.x);
let scaledY = Math.floor(myProjectile.position.y);
console.log(`Initial position (${myProjectile.position.x}, ${myProjectile.position.y}, ${myProjectile.position.z}), canvas pos = (${scaledX}, ${scaledY})`);
myCanvas.writePixel(scaledX, canvasHeight - scaledY, red);
while (myProjectile.position.y > 0) {
    myProjectile = tick(myEnvironment, myProjectile);
    let scaledX = Math.floor(myProjectile.position.x);
    let scaledY = Math.floor(myProjectile.position.y);
    console.log(`Position after tick ${tickCount} is (${myProjectile.position.x}, ${myProjectile.position.y}), canvas pos = (${scaledX}, ${scaledY})`);
    if (scaledX < 0 && scaledX > (canvasWidth - 1))
        console.log(`X Pixel off canvas at (${scaledX}, ${scaledY})`);
    else if (scaledY < 0 && scaledY > (canvasHeight - 1))
        console.log(`Y Pixel off canvas at (${scaledX}, ${scaledY})`);
    else
        myCanvas.writePixel(scaledX, canvasHeight - scaledY, red);
    tickCount += 1;
}
myCanvas.convertToPPM('chapter2.ppm');