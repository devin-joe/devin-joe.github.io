var testGameArea = new GameArea();
var testWorld = new World();
var testActor = new Actor();
testWorld.addActor(testActor);
testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
