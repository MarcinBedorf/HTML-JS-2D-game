const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none';
    init();
});

function init() {
    displayText.style.display = 'none';
    timer = 60;
    decreaseTimer();
    playerHealth.style.width = enemy.health = '100%';
    enemyHealth.style.width = enemy.health = '100%';
    player = new Fighter({
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
    enemy = new Fighter({
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
};
