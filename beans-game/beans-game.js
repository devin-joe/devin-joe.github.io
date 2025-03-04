const GRAVITY = 1;
const FRICTION = 0.9;
const BOUNCE = 0.5;
const AIR_RESISTANCE = 0.99;
const JUMP_POWER = 15;
const SPEED = 1;
const AIR_SPEED = 0.25;

class InWorldActor extends Actor {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
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
        for (let i = 0; i < this.world.actorList.length; i++) {
            let object = this.world.actorList[i];
            if (object instanceof someClass && this.isTouching(object)) {
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
        this.gameX = this.x;
        this.gameY = this.y;
        super.act()
    }
}

class PhysicsActor extends InWorldActor {
    constructor(imageSrc = "images/beans0.png") {
        super(imageSrc);
        this.x = 0;
        this.y = 0;
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

        if ((uInter < dInter) && (uInter < lInter) && (uInter < rInter)) {
            this.y = object.y + object.image.height;
            this.yv = 0;
        }
        else if ((dInter < uInter) && (dInter < lInter) && (dInter < rInter)) {
            this.y = object.y - this.image.height;
            this.yv = 0;
        }
        else if ((lInter < uInter) && (lInter < dInter) && (lInter < rInter)) {
            this.x = object.x + object.image.width;
            this.xv = 0;
        }
        else if ((rInter < uInter) && (rInter < dInter) && (rInter < lInter)) {
            this.x = object.x - this.image.width;
            this.xv = 0;
        }
    }
    act() {
        if (this.isGrounded()) {
            this.yv *= FRICTION;
            this.xv *= FRICTION;
        }
        this.yv *= AIR_RESISTANCE;
        this.xv *= AIR_RESISTANCE;
        if (!this.isGrounded()) {
            this.yv += GRAVITY;
        }
        this.x += this.xv;
        this.y += this.yv;
        this.bounce();
        this.collide();
        console.log(this.y);

        super.act();
    }
}

class Player extends PhysicsActor {
    constructor() {
        super();
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
                this.xv -= AIR_SPEED;
            }
            if (isInputted("right")) {
                this.xv += AIR_SPEED;
            }
        }
        super.act();
    }
}

class Ground extends InWorldActor {
    constructor() {
        super();
    }
}