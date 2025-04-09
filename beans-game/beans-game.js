const GRAVITY = 1;
const XV_DAMPING = 0.9;
const BOUNCE = 0.5;
const AIR_RESISTANCE = 1;
const JUMP_POWER = 15;
const SPEED = 1;

/**
 * An actor with a position in a custom reference frame.
 */
class PositionActor extends Actor {
    constructor(imageSrc = "images/beans0.png", x = 0, y = 0) {
        super(imageSrc);
        this.x = x;
        this.y = y;
    }
    isTouching(object) {
        if (this.x + this.image.width < object.x) {return false;}
        if (this.x > object.x + object.image.width) {return false;}
        if (this.y + this.image.height < object.y) {return false;}
        if (this.y > object.y + object.image.height) {return false;}
        return true;
    }
    getTouching(someClass) {
        let touchingList = [];
        let objectList = this.world.getActors(someClass);
        for (let i = 0; i < objectList.length; i++) {
            let object = objectList[i];
            if (this.isTouching(object)) {
                touchingList.push(object);
            }
        }
        return touchingList;
    }
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
    act() {
        super.act();
    }
}

class PhysicsActor extends PositionActor {
    constructor(imageSrc = "images/beans0.png", x = 0, y = 0) {
        super(imageSrc, x, y);
        this.xv = 0;
        this.yv = 0;
    }
    isGrounded() {
        let grounds = this.getTouching(Ground);
        for (let i = 0; i < grounds.length; i++) {
            let ground = grounds[i];
            if (this.y + this.image.height == ground.y && this.yv >= 0) {
                return true;
            }
        }
        return (this.y >= 450 - this.image.height);
    }
    bounce() {
        // if (this.y < 0) {
            //     this.y = 0;
            //     this.yv *= -1;
            // }
        // This should NOT have the number 450 or 800 hard coded TODO.
        if (this.y > 450 - this.image.height) {
            this.y = 450 - this.image.height;
            this.yv = 0;
        }
        if (this.x < 0) {
            this.x = 0;
            this.xv *= -BOUNCE;
        }
        // This should NOT have the number 450 or 800 hard coded TODO.
        if (this.x > 800 - this.image.width) {
            this.x = 800 - this.image.width;
            this.xv *= -BOUNCE;
        }
    }
    collide() {
        let grounds = this.getTouching(Ground);
        for (let i = 0; i < grounds.length; i++) {
            this.collideWith(grounds[i]);
        }
    }
    collideWith(object) {
        // Thickness of intersection between objects in the up, down, left, and right directions
        let uInter = (object.y + object.image.height) - this.y;
        let dInter = (this.y + this.image.height) - object.y;
        let lInter = (object.x + object.image.width) - this.x;
        let rInter = (this.x + this.image.width) - object.x;

        if ((uInter < dInter) && (uInter < lInter) && (uInter < rInter) && (this.yv <= 0)) {
            this.y = object.y + object.image.height;
            this.yv = 0;
        }
        else if ((dInter < uInter) && (dInter < lInter) && (dInter < rInter) && (this.yv >= 0)) {
            this.y = object.y - this.image.height;
            this.yv = 0;
        }
        else if ((lInter < uInter) && (lInter < dInter) && (lInter < rInter) && (this.xv <= 0)) {
            this.x = object.x + object.image.width;
            this.xv = 0;
        }
        else if ((rInter < uInter) && (rInter < dInter) && (rInter < lInter) && (this.xv >= 0)) {
            this.x = object.x - this.image.width;
            this.xv = 0;
        }
    }
    act() {
        this.yv *= AIR_RESISTANCE;
        this.xv *= XV_DAMPING;
        if (!this.isGrounded()) {
            this.yv += GRAVITY;
        }
        this.x += this.xv;
        this.y += this.yv;
        this.bounce();
        this.collide();

        super.act();
    }
}

class Player extends PhysicsActor {
    constructor(imageSrc = "images/beans0.png", x = 0, y = 0) {
        super(imageSrc, x, y);
    }
    act() {
        if (this.isGrounded()) {
            if (isInputted("up")) {
                this.yv = -JUMP_POWER;
            }
            if (isInputted("down")) {
                this.yv += 0;
            }
            if (isInputted("left")) {
                this.xv -= SPEED;
            }
            if (isInputted("right")) {
                this.xv += SPEED;
            }
        } else {
            if (isInputted("up")) {
                this.yv -= 0;
            }
            if (isInputted("down")) {
                this.yv += 0;
            }
            if (isInputted("left")) {
                this.xv -= SPEED;
            }
            if (isInputted("right")) {
                this.xv += SPEED;
            }
        }
        super.act();
    }
}

class Ground extends PositionActor {
    constructor(imageSrc = "images/beans0.png", x = 0, y = 0) {
        super(imageSrc, x, y);
    }
}

class Camera extends PositionActor {
    constructor(x, y) {
        super("images/beans0.png", x, y);
        this.isShown = false;
    }

    act() {
        let positionActors = this.world.getActors(PositionActor);
        
        // Test:
        let followed = this.world.getActors(Player)[0];
        this.x = followed.x + followed.image.width/2;
        this.y = followed.y + followed.image.height/2;

        for (let i = 0; i < positionActors.length; i++) {
            let actor = positionActors[i];
            // Egregious TODO:
            actor.gameX = actor.x - this.x + this.world.gameArea.canvas.width/2;
            actor.gameY = actor.y - this.y + this.world.gameArea.canvas.height/2;
        }
        super.act();
    }
}