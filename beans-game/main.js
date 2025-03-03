const testGameArea = new Game();
const testWorld = new World();
const testActor = new Player();
const testGround = new Ground();
testWorld.addActor(testActor);
testWorld.addActor(testGround);
testGround.setPosition(100, 300);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
