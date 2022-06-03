// sprite class
class Sprite {
    constructor({
        position,
        imageSrc,
        scale = 1,
        framesMax = 1,
        offset = {
            x: 0,
            y: 0
        }
    }) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 8;
        this.offset = offset;
    };

    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    };

    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            };
        };
    };

    // flipHorizontally(img, x, y) {
    //     // move to x + img's width
    //     c.translate(this.position.x + this.image.width, y);

    //     // scaleX by -1; this "trick" flips horizontally
    //     c.scale(this.reverse, 1);

    //     // draw the img
    //     // no need for x,y since we've already translated
    //     this.draw()

    //     // always clean up -- reset transformations to default
    //     c.setTransform(1, 0, 0, 1, 0, 0);
    // }

    update() {
        this.draw();
        this.animateFrames();
    };
};
