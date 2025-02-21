var keysDown = {};
window.onkeyup = function(e) { keysDown[e.key] = false; }
window.onkeydown = function(e) { keysDown[e.key] = true; }

function isKeyDown(key) {
    return keysDown[key];
}

class Area {
    constructor(width = 800, height = 450) {
        this.worldList = [];
        this.focusedWorld = null;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game").appendChild(this.canvas);
        // div.insertBefore(this.canvas, div.childNodes[0])
        // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
    }
    addWorld(world, focused = true) {
        this.worldList.push(world);
        if (focused) {
            this.focusedWorld = world;
        }
        world.area = this;
    }
    removeWorld(world) {
        this.worldList.pop(world);
        // Focus the most recently added world.
        if (world == this.focusedWorld) {
            if (this.worldList.length > 0) {
                this.focusedWorld = this.worldList.at(-1);
            } else {
                this.focusedWorld = null;
            }
        }
        world.area = null;
        /**
         * It should be noted that removing the worlds without properly
         * deactiving or deleting them or something might amass garbage
         * or something. TODO?
         */
    }
    render() {
        this.focusedWorld.render();
    }
    act() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.worldList.length; i++) {
            let world = this.worldList[i];
            if (world.isActive) {
                this.worldList[i].act();
            }
        }
        this.render();
    }
}

class World {
    constructor() {
        this.isActive = true;
        this.actorList = [];
        this.area = null;
    }
    addActor(actor) {
        this.actorList.push(actor);
        actor.world = this;
    }
    removeActor(actor) {
        this.actorList.pop(actor);
        actor.world = null;
    }
    render() {
        var ctx = this.area.context;
        for (let i = 0; i < this.actorList.length; i++) {
            let actor = this.actorList[i];
            ctx.drawImage(actor.image, actor.x, actor.y);
        }
    }
    act() {
        for (let i = 0; i < this.actorList.length; i++) {
            this.actorList[i].act()
        }
    }
}

class Actor {
    constructor(imageSrc = "images/beans0.png") {
        this.x = 100;
        this.y = 100;
        this.xv = 0;
        this.yv = 0;
        this.image = new Image();
        this.image.src = imageSrc
        this.world = null;
    }
    act() {

        /**
         * The code below is for testing purposes lol delete it.
         */
        if (isKeyDown("w")) {
            this.yv -= 1;
        }
        if (isKeyDown("a")) {
            this.xv -= 1;
        }
        if (isKeyDown("s")) {
            this.yv += 1;
        }
        if (isKeyDown("d")) {
            this.xv += 1;
        }
        this.x += this.xv;
        this.y += this.yv;
        this.yv *= 0.9
        this.xv *= 0.9
        if (this.x < 0) {
            this.x = 0;
            this.xv *= -1;
        }
        if (this.y < 0) {
            this.y = 0;
            this.yv *= -1;
        }
        if (this.x > this.world.area.canvas.width - this.image.width) {
            this.x = this.world.area.canvas.width - this.image.width;
            this.xv *= -1;
        }
        if (this.y > this.world.area.canvas.height - this.image.height) {
            this.y = this.world.area.canvas.height - this.image.height;
            this.yv *= -1;
        }
        /**
         * The code above is for testing purposes lol delete it.
         */
    }
}