// World constants
const GRAVITY = 1;
const DRAG = 0.99;
const FRICTION = 0.9;
const BOUNCE = 0.5;
// Player constants
const JUMP_POWER = 15;
const SPEED = 1;
const AIR_SPEED = 0.5;

class InWorldActor extends Actor {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
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
        // This should NOT have the number 450 or 800 hard coded TODO.
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
    act() {
        this.yv += GRAVITY;
        this.x += this.xv;
        this.y += this.yv;
        this.bounce();
        if (this.isGrounded()) {
            this.yv *= FRICTION;
            this.xv *= FRICTION;
        } else {
            this.yv *= DRAG;
            this.xv *= DRAG;
        }
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
                this.yv -= JUMP_POWER;
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