const testGameArea = new Game();
const testWorld = new World();
const player = new Player(undefined, 400, 225);
testWorld.addActor(player);
testWorld.addActor(new Ground("images/beans0.png", 300, 300));
testWorld.addActor(new Ground("images/beans0.png", 300, 360));
testWorld.addActor(new Ground("images/beans0.png", 200, 350));
testWorld.addActor(new Ground("images/beans0.png", 400, 360));
testWorld.addActor(new Ground("images/beans0.png", 300, 240));
testWorld.addActor(new Ground("images/tile1_wide.png", 165, 400));
testWorld.addActor(new Camera(400, 225));

testWorld.addActor(new Ground("images/beans0.png", 120, 200));
testWorld.addActor(new Ground("images/beans0.png", 80, 200));
testWorld.addActor(new Ground("images/beans0.png", 40, 200));
testWorld.addActor(new Ground("images/beans0.png", 0, 200));
testWorld.addActor(new Ground("images/beans0.png", -40, 200));
testWorld.addActor(new Ground("images/beans0.png", -80, 200));

testGameArea.addWorld(testWorld);

function act() {
    testGameArea.act();
}
var interval = setInterval(act, 20);
