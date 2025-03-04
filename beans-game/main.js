const testGameArea = new Game();
const testWorld = new World();
const testActor = new Player();
const testGround = new Ground();
const testGround2 = new Ground();
const testGround3 = new Ground();
const testGround4 = new Ground();
testWorld.addActor(testActor);
testWorld.addActor(testGround);
testWorld.addActor(testGround2);
testWorld.addActor(testGround3);
testWorld.addActor(testGround4);
testGround.setPosition(300, 380);
testGround2.setPosition(300, 320);
testGround3.setPosition(200, 370);
testGround4.setPosition(400, 370);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
