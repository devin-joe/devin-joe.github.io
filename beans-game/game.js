class Game {
    constructor(width = 800, height = 450) {
        this.worldList = [];
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.getElementById("game").appendChild(this.canvas);
    }
    addWorld(world) {
        this.worldList.push(world);
        world.game = this;
    }
    removeWorld(world) {
        this.worldList.pop(world);
        world.game = null;
        /**
         * It should be noted that removing the worlds without properly
         * deactiving or deleting them or something might amass garbage
         * or something. TODO?
         */
    }
    renderWorld(world) {
        let ctx = this.context;
        ctx.drawImage(world.backgroundImage, 0, 0);
        for (let i = 0; i < world.actorList.length; i++) {
            let actor = world.actorList[i];
            if (actor.isShown) {
                this.renderActor(actor);
            }
        }
    }
    renderActor(actor, x, y) {
        let ctx = this.context;
        ctx.drawImage(actor.image, actor.gameX, actor.gameY);
    }
    act() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.worldList.length; i++) {
            let world = this.worldList[i];
            if (world.isActive) {
                world.act();
            }
            if (world.isShown) {
                this.renderWorld(world);
            }
        }
    }
}

class World {
    constructor() {
        this.isActive = true;
        this.isShown = true;
        this.backgroundImage = new Image();
        this.backgroundImage.src = "images/map2.jpg";
        this.actorList = [];
    }
    addActor(actor) {
        if (actor.world != null) {
            actor.world.removeActor(actor);
        }
        this.actorList.push(actor);
        actor.world = this;
    }
    removeActor(actor) {
        this.actorList.pop(actor);
        actor.world = null;
    }
    act() {
        for (let i = 0; i < this.actorList.length; i++) {
            this.actorList[i].act();
        }
    }
}

class Actor {
    constructor(imageSrc = "images/beans0.png") {
        this.isActive = true;
        this.isShown = true;
        this.gameX = 0;
        this.gameY = 0;
        this.image = new Image();
        this.image.src = imageSrc;
        this.world = null;
    }
    act() {
        
    }
}
