function startGame() {
    // myGamePiece = new component(30, 30, 200, 200);
    
    // Trying idk
    // while (true) {
        //     if (pressedKeys["w"]) {
            //         testArea.act();
            //     }
            //     // setTimeout(testArea.act(), 20);
            // }
}

function act() {
    testArea.act();
}
        
var testArea = new Area();
var testWorld = new World();
var testActor = new Actor();
testWorld.addActor(testActor);
testArea.addWorld(testWorld);
var interval = setInterval(act, 20);

// function component(width, height, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.xv = 0;
//     this.yv = 0;
//     this.update = function() {s
//         ctx = myGameArea.context;
//         image = new Image();
//         image.src = "images/hammer.png"
//         ctx.drawImage(image, this.x, this.y);
//         if (pressedKeys["w"]) {
//             this.yv -= 1;
//         }
//         if (pressedKeys["d"]) {
//             this.xv += 1;
//         }
//         if (pressedKeys["s"]) {
//             this.yv += 1;
//         }
//         if (pressedKeys["a"]) {
//             this.xv -= 1;
//         }
//         this.x += this.xv;
//         this.y += this.yv;
//         this.xv *= 0.9;
//         this.yv *= 0.9;
//     }
// }
