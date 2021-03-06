const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);




// layers
const layerSpeed = 1;

const skyLayer = new Image();
skyLayer.src = './img/sky.png';
const cloudsLayer3 = new Image();
cloudsLayer3.src = './img/clouds3.png';
const background = new Image();
background.src = './img/background.png';
const cloudsLayer2 = new Image();
cloudsLayer2.src = './img/clouds2.png';
const cloudsLayer1 = new Image();
cloudsLayer1.src = './img/clouds1.png';
const platformLayer = new Image();
platformLayer.src = './img/platform.png'

const layer1 = new Layer(skyLayer, 0);
const layer2 = new Layer(cloudsLayer3, 0.2);
const layer3 = new Layer(background, 0);
const layer4 = new Layer(cloudsLayer2, 0.5);
const layer6 = new Layer(cloudsLayer1, 0.8);
const layer5 = new Layer(platformLayer, 0);

const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6];

//--------------------------------------------//

//// Gravity

const gravity = 0.7;

// background image

// const platform = new Sprite({
//     position: {
//         x: 0,
//         y: 0
//     },
//     imageSrc: './img/platform.png'
// });

let player = new Fighter({
    position: {
        x: 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Player 1/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 143
    },
    sprites: {
        idle: {
            imageSrc: './img/Player 1/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/Player 1/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Player 1/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/Player 1/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/Player 1/Attack1.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/Player 1/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/Player 1/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 60,
            y: 50
        },
        width: 250,
        height: 50
    }
});

player.draw();

let enemy = new Fighter({
    position: {
        x: 970,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/Player 2/Idle.png',
    framesMax: 10,
    scale: 2.7,
    offset: {
        x: 215,
        y: 59
    },
    sprites: {
        idle: {
            imageSrc: './img/Player 2/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './img/Player 2/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Player 2/Jump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: './img/Player 2/Fall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: './img/Player 2/Attack1.png',
            framesMax: 7
        },
        takeHit: {
            imageSrc: './img/Player 2/Take Hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/Player 2/Death.png',
            framesMax: 11
        }
    },
    attackBox: {
        offset: {
            x: -215,
            y: 50
        },
        width: 150,
        height: 50
    }
});

enemy.draw();

console.log(player);

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
};

decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // c.fillStyle = 'rgba(255, 255, 255, .1)';
    // c.fillRect(0, 0, canvas.width, canvas.height);
    gameObjects.forEach(object => {
        object.updateLayer();
        object.drawLayer();
    });
    player.update();
    enemy.update();
    // platform.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else {
        player.switchSprite('idle');
    };

    // jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    };

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else {
        enemy.switchSprite('idle');
    };

    //enemy jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    };

    // detect for collision & enemy gets hit
    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) && player.isAttacking && player.framesCurrent === 4
    ) {
        enemy.takeHit();
        player.isAttacking = false;
        // enemy.health -= 12.5;
        document.querySelector('#enemyHealth').style.width = enemy.health + '%';
    };

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    };

    // player 1 gets hit
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player
        }) && enemy.isAttacking && enemy.framesCurrent === 3
    ) {
        player.takeHit();
        enemy.isAttacking = false;
        // player.health -= 20;
        document.querySelector('#playerHealth').style.width = player.health + '%';
    };

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 3) {
        enemy.isAttacking = false
    };

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({
            player,
            enemy,
            timerId
        });
    };
};

animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break
            case 'w':
                if (event.repeat) {return}
                player.velocity.y = -20;
                break
            case ' ':
                if (event.repeat) {return}
                player.attack();
                break
        }
    };

    if (!enemy.dead) {
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break
            case 'ArrowUp':
                if (event.repeat) {return}
                enemy.velocity.y = -20;
                break
            case 'ArrowDown':
                if (event.repeat) {return}
                enemy.attack();
                break
        };
    };

    // console.log(event.key);
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
    };

    //// Enemy Keys
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
    };

    console.log(event.key);
});
