// background layers class
class Layer {
    constructor(image, speedModifier) {
        this.x = 0;
        this.y = 0;
        this.width = 1024;
        this.height = 576;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = layerSpeed * this.speedModifier;
    };

    updateLayer() {
        this.speed = layerSpeed * this.speedModifier;
        if (this.x <= -this.width) {
            this.x = 0;
        }
        this.x = this.x - this.speed;
        // this.x = gameFrame * this.speed % this.width;
    };

    drawLayer() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
        c.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    };
};
