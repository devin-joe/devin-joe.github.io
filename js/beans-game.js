const testGameArea = new GameArea();
const testWorld = new World();
const testActor = new Actor();
testWorld.addActor(testActor);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
