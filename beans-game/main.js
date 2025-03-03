const testGameArea = new Game();
const testWorld = new World();
const testActor = new Player();
const testGround = new Ground();
const testGround2 = new Ground();
testWorld.addActor(testActor);
testWorld.addActor(testGround);
testGround.setPosition(300, 380);
testWorld.addActor(testGround2);
testGround2.setPosition(300, 320);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
