'use strict';

const snakeBoxes = document.querySelectorAll('main div');
const score = document.getElementById('pts');
const canvasBoxNumber = 20;
const cornerBoxMapping = {
    up: {
        0: 380,
        1: 381,
        2: 382,
        3: 383,
        4: 384,
        5: 385,
        6: 386,
        7: 387,
        8: 388,
        9: 389,
        10: 390,
        11: 391,
        12: 392,
        13: 393,
        14: 394,
        15: 395,
        16: 396,
        17: 397,
        18: 398,
        19: 399,
        20: 400,
    },
    down: {
        380: 0,
        381: 1,
        382: 2,
        383: 3,
        384: 4,
        385: 5,
        386: 6,
        387: 7,
        388: 8,
        389: 9,
        390: 10,
        391: 11,
        392: 12,
        393: 13,
        394: 14,
        395: 15,
        396: 16,
        397: 17,
        398: 18,
        399: 19,
        400: 20,
    },
    left: {
        0: 19,
        20: 39,
        40: 59,
        60: 79,
        80: 99,
        100: 119,
        120: 139,
        140: 159,
        160: 179,
        180: 199,
        200: 219,
        220: 239,
        240: 259,
        260: 279,
        280: 299,
        300: 319,
        320: 339,
        340: 359,
        360: 379,
        380: 399,
    },
    right: {
        19: 0,
        39: 20,
        59: 40,
        79: 60,
        99: 80,
        119: 100,
        139: 120,
        159: 140,
        179: 160,
        199: 180,
        219: 200,
        239: 220,
        259: 240,
        279: 260,
        299: 280,
        319: 300,
        339: 320,
        359: 340,
        379: 360,
        399: 380,
    }
}
const cornerUpBoxNumberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
const cornerDownBoxNumberList = [380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400];
const cornerRightBoxNumberList = [19, 39, 59, 79, 99, 119, 139, 159, 179, 199, 219, 239, 259, 279, 299, 319, 339, 359, 379, 399];
const cornerLeftBoxNumberList = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380];
let snakeLength = 2;
let snakeTailMotionStack = ['rightShrink', 'rightShrink'];
let snakeBoxIndexStack = [106, 107];
let currentDirection = 'right';
let foodCount = 0;
let foodBoxIndex = 0;

const gameLoop = setInterval(() => {
    if (!foodCount) {
        generateFood();
        foodCount++;
    }
    moveSnake();
}, 150);


function moveSnake() {
    if (currentDirection === 'up') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        let nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] - canvasBoxNumber;
        if (cornerUpBoxNumberList.includes(snakeBoxIndexStack[snakeLength - 1])) {
            nextSnakeBoxIndex = cornerBoxMapping['up'][snakeBoxIndexStack[snakeLength - 1]];
        }
        if (snakeBoxIndexStack.includes(nextSnakeBoxIndex)) {
            gameOver();
            return;
        }

        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('upGrow');
        if (foodBoxIndex === nextSnakeBoxIndex) {
            foodCount = 0;
            snakeLength++;
            score.textContent = parseInt(score.textContent) + 1;


            snakeTailMotionStack.push('downShrink');
            snakeTailMotionStack[snakeLength - 1] = 'downShrink';
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
        } else {
            snakeTailMotionStack.push('downShrink');
            snakeTailMotionStack[snakeLength - 1] = 'downShrink';
            snakeTailMotionStack.shift();
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
            snakeBoxIndexStack.shift();
        }
    } else if (currentDirection === 'down') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        let nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] + canvasBoxNumber;
        if (cornerDownBoxNumberList.includes(snakeBoxIndexStack[snakeLength - 1])) {
            nextSnakeBoxIndex = cornerBoxMapping['down'][snakeBoxIndexStack[snakeLength - 1]];
        }
        if (snakeBoxIndexStack.includes(nextSnakeBoxIndex)) {
            gameOver();
            return;
        }
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('downGrow');
        if (foodBoxIndex === nextSnakeBoxIndex) {
            foodCount = 0;
            snakeLength++;
            score.textContent = parseInt(score.textContent) + 1;

            snakeTailMotionStack.push('upShrink');
            snakeTailMotionStack[snakeLength - 1] = 'upShrink';
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
        } else {
            snakeTailMotionStack.push('upShrink');
            snakeTailMotionStack[snakeLength - 1] = 'upShrink';
            snakeTailMotionStack.shift();
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
            snakeBoxIndexStack.shift();
        }
    } else if (currentDirection === 'left') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        let nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] - 1;
        if (cornerLeftBoxNumberList.includes(snakeBoxIndexStack[snakeLength - 1])) {
            nextSnakeBoxIndex = cornerBoxMapping['left'][snakeBoxIndexStack[snakeLength - 1]];
        }
        if (snakeBoxIndexStack.includes(nextSnakeBoxIndex)) {
            gameOver();
            return;
        }
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('leftGrow');
        if (foodBoxIndex === nextSnakeBoxIndex) {
            foodCount = 0;
            snakeLength++;
            score.textContent = parseInt(score.textContent) + 1;

            snakeTailMotionStack.push('rightShrink');
            snakeTailMotionStack[snakeLength - 1] = 'rightShrink';
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
        } else {
            snakeTailMotionStack.push('rightShrink');
            snakeTailMotionStack[snakeLength - 1] = 'rightShrink';
            snakeTailMotionStack.shift();
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
            snakeBoxIndexStack.shift();
        }
    } else if (currentDirection === 'right') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        let nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] + 1;
        if (cornerRightBoxNumberList.includes(snakeBoxIndexStack[snakeLength - 1])) {
            nextSnakeBoxIndex = cornerBoxMapping['right'][snakeBoxIndexStack[snakeLength - 1]];
        }
        if (snakeBoxIndexStack.includes(nextSnakeBoxIndex)) {
            gameOver();
            return;
        }
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('rightGrow');
        if (foodBoxIndex === nextSnakeBoxIndex) {
            foodCount = 0;
            snakeLength++;
            score.textContent = parseInt(score.textContent) + 1;

            snakeTailMotionStack.push('leftShrink');
            snakeTailMotionStack[snakeLength - 1] = 'leftShrink';
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
        } else {
            snakeTailMotionStack.push('leftShrink');
            snakeTailMotionStack[snakeLength - 1] = 'leftShrink';
            snakeTailMotionStack.shift();
            snakeBoxIndexStack.push(nextSnakeBoxIndex);
            snakeBoxIndexStack.shift();
        }
    }
}

function generateFood() {
    let randomNumber = Math.floor(Math.random() * 400);
    while (snakeBoxIndexStack.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 400);
    }
    foodBoxIndex = randomNumber;
    snakeBoxes[randomNumber].classList.add('food');
}

function gameOver() {
    score.textContent = 0;
    snakeBoxIndexStack.slice(0, snakeLength - 2).forEach((ind) => {
        snakeBoxes[ind].removeAttribute('class');
    })
    snakeLength = 2;
    snakeBoxIndexStack = snakeBoxIndexStack.slice(-2);
    snakeTailMotionStack = snakeTailMotionStack.slice(-2);
}


// Arrow Keys Control
// -------------------------------------------------

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        if (snakeTailMotionStack[snakeLength - 1] !== 'upShrink') {
            currentDirection = 'up';
        }
    } else if (e.key === 'ArrowDown') {
        if (snakeTailMotionStack[snakeLength - 1] !== 'downShrink') {
            currentDirection = 'down';
        }
    } else if (e.key === 'ArrowLeft') {
        if (snakeTailMotionStack[snakeLength - 1] !== 'leftShrink') {
            currentDirection = 'left';
        }
    } else if (e.key === 'ArrowRight') {
        if (snakeTailMotionStack[snakeLength - 1] !== 'rightShrink') {
            currentDirection = 'right';
        }
    }
})