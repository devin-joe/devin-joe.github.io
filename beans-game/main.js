const testGameArea = new Game();
const testWorld = new World();
const testActor = new Player();
testWorld.addActor(testActor);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
