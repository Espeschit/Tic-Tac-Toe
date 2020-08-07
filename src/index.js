const board = document.getElementById('board');
const resetButton = document.getElementById('reset-button');
let squares = document.getElementsByClassName('square');
let subtitle = document.getElementById('subtitle');
let p1CurrentScore = document.getElementById('p1Score');
let p2CurrentScore = document.getElementById('p2Score');

const squareValue = 8;
let mark = true;
let move = 0
let p1Score = 0
let p2Score = 0

p1CurrentScore.textContent = 0
p2CurrentScore.textContent = 0

const winCondition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [6,4,2]
];

function gameBoard() {
    for (let i = 0; i <= squareValue; i++) {
        let square = document.createElement('div');
        board.appendChild(square).className = 'square';
        square.id = `square${i}`
    };
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            if (mark) {
                squares[i].textContent = 'X';
                subtitle.textContent = 'O turn';
                mark = !mark;
                this.style.pointerEvents = 'none';
                move++
            } else {
                squares[i].textContent = 'O';
                subtitle.textContent = 'X turn';
                mark = !mark;
                this.style.pointerEvents = 'none';
                move++
            };
            
            for (let j = 0; j < squares.length; j++) {
                checkWin(squares[j]);
                if (move == 9) {
                    subtitle.textContent = 'It\'s a tie!'
                }
            };

            setScore();

            resetButton.addEventListener('click', function() {
                squares[i].textContent = '';
                subtitle.textContent = 'X turn';
                    for (let k = 0; k < squares.length; k++) {
                        squares[k].style.pointerEvents = 'auto';
                    };
                mark = true;
                move = 0
            });
        });
    };
};

function CheckX(indexes) {
    return indexes.every (
        function(index) {
            return squares[index].textContent === 'X';
        }
    )
};

function CheckO(indexes) {
    return indexes.every (
        function(index) {
            return squares[index].textContent === 'O';
        }
    )
};

function setScore() {
    if (winCondition.some(CheckX)) {
        p1Score = p1Score + 1
        p1CurrentScore.textContent = p1Score
        console.log(p1Score)
    }
    if (winCondition.some(CheckO)) {
        p2Score = p2Score + 1
        p2CurrentScore.textContent = p2Score
        console.log(p2Score)
    }
};

function checkWin(board) {
        if (winCondition.some(CheckX)) {
            subtitle.textContent = 'X won!'
            board.style.pointerEvents = 'none';
            move = 0
        }
        if (winCondition.some(CheckO)) {
            subtitle.textContent = 'O won!'
            board.style.pointerEvents = 'none';
            move = 0
        }
};

gameBoard();