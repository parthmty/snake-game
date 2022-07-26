'use strict';

const snakeBoxes = document.querySelectorAll('main div');
const canvasBoxNumber = 20;
let snakeLength = 4;
let snakeTailMotionStack = ['rightShrink', 'rightShrink', 'rightShrink', 'rightShrink'];
let snakeBoxIndexStack = [106, 107, 108, 109];
let currentDirection = 'right';

setInterval(() => {
    moveSnake();
}, 200);


function moveSnake() {
    if (currentDirection === 'up') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        const nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] - canvasBoxNumber;
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('upGrow');

        snakeTailMotionStack.push('downShrink');
        snakeTailMotionStack[snakeLength - 1] = 'downShrink';
        snakeTailMotionStack.shift();
        snakeBoxIndexStack.push(nextSnakeBoxIndex);
        snakeBoxIndexStack.shift();
    } else if (currentDirection === 'down') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        const nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] + canvasBoxNumber;
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('downGrow');

        snakeTailMotionStack.push('upShrink');
        snakeTailMotionStack[snakeLength - 1] = 'upShrink';
        snakeTailMotionStack.shift();
        snakeBoxIndexStack.push(nextSnakeBoxIndex);
        snakeBoxIndexStack.shift();
    } else if (currentDirection === 'left') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        const nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] - 1;
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('leftGrow');

        snakeTailMotionStack.push('rightShrink');
        snakeTailMotionStack[snakeLength - 1] = 'rightShrink';
        snakeTailMotionStack.shift();
        snakeBoxIndexStack.push(nextSnakeBoxIndex);
        snakeBoxIndexStack.shift();
    } else if (currentDirection === 'right') {
        snakeBoxes[snakeBoxIndexStack[0]].removeAttribute('class');
        snakeBoxes[snakeBoxIndexStack[0]].classList.add(snakeTailMotionStack[0]);

        const nextSnakeBoxIndex = snakeBoxIndexStack[snakeLength - 1] + 1;
        snakeBoxes[nextSnakeBoxIndex].removeAttribute('class');
        snakeBoxes[nextSnakeBoxIndex].classList.add('rightGrow');

        snakeTailMotionStack.push('leftShrink');
        snakeTailMotionStack[snakeLength - 1] = 'leftShrink';
        snakeTailMotionStack.shift();
        snakeBoxIndexStack.push(nextSnakeBoxIndex);
        snakeBoxIndexStack.shift();
    }
}


// When User presses any Arrow Keys
// -------------------------------------------------

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        currentDirection = 'up';
    } else if (e.key === 'ArrowDown') {
        currentDirection = 'down';
    } else if (e.key === 'ArrowLeft') {
        currentDirection = 'left';
    } else if (e.key === 'ArrowRight') {
        currentDirection = 'right';
    }
})