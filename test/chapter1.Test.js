const Point = require('../point');
const Vector = require('../vector');

function tick(environment, projectile) {
    let newPosition = projectile.position.add(projectile.velocity);
    let newVelocity = projectile.velocity.add(environment.gravity.add(environment.wind));
    return {
        position: newPosition,
        velocity: newVelocity
    };
}
describe('chapter 1 test exercise', () => {
    let myProjectile = {
        position: new Point(0, 1, 0),
        velocity: new Vector(1, 1, 0).normalize()
    };

    let myEnvironment = {
        gravity: new Vector(0, -0.1, 0),
        wind: new Vector(-0.01, 0, 0)
    };

    it('chapter 1 test exercise', () => {
        let tickCount = 1;
        console.log(`Initial position (${myProjectile.position.x}, ${myProjectile.position.y}, ${myProjectile.position.z})`);
        while (myProjectile.position.y > 0) {
            myProjectile = tick(myEnvironment, myProjectile);
            console.log(`Position after tick ${tickCount} is (${myProjectile.position.x}, ${myProjectile.position.y}, ${myProjectile.position.z})`);
            tickCount += 1;
        }
    });
});
