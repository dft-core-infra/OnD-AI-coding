const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');

context.scale(20, 20);

// Piece shapes
function createPiece(type) {
    if (type === 'I') {
        return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
        ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'J') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'Z') {
        return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    }
}

// Colors for the pieces
const colors = [
    null,
    '#00f2ff', // I - Cyan
    '#ff9d00', // L - Orange
    '#3d5afe', // J - Blue
    '#ffff00', // O - Yellow
    '#ff0066', // Z - Pink/Red
    '#00ff66', // S - Green
    '#9c27b0', // T - Purple
];

function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

function draw() {
    // Fill background
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena, {x: 0, y: 0});
    drawMatrix(player.matrix, player.pos);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                // Block body
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
                
                // Block border/glow
                context.strokeStyle = 'rgba(255,255,255,0.5)';
                context.lineWidth = 0.05;
                context.strokeRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }
    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0;
}

function playerMove(dir) {
    player.pos.x += dir;
    if (collide(arena, player)) {
        player.pos.x -= dir;
    }
}

function playerReset() {
    const pieces = 'TJLOSIZ';
    player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                    (player.matrix[0].length / 2 | 0);
    
    if (collide(arena, player)) {
        // Game Over
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('final-score').innerText = score;
        gameOver = true;
        // Reset form state: show input form, hide confirm message
        document.getElementById('score-form').style.display = 'flex';
        document.getElementById('score-confirm').style.display = 'none';
        setRandomDefaultName();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}

function collide(arena, player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;

        score += rowCount * 10;
        lines += 1;
        rowCount *= 2;
    }
}

function updateScore() {
    scoreElement.innerText = score;
    linesElement.innerText = lines;
}

function resetGame() {
    arena.forEach(row => row.fill(0));
    score = 0;
    lines = 0;
    gameOver = false;
    document.getElementById('game-over').style.display = 'none';
    updateScore();
    playerReset();
    update();
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
let score = 0;
let lines = 0;
let gameOver = false;

function update(time = 0) {
    if (gameOver) return;

    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    if (dropCounter > dropInterval) {
        playerDrop();
    }

    draw();
    requestAnimationFrame(update);
}

const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
};

// Controls
document.addEventListener('keydown', event => {
    if (gameOver) return;

    if (event.keyCode === 37 || event.keyCode === 65) { // Left or A
        playerMove(-1);
    } else if (event.keyCode === 39 || event.keyCode === 68) { // Right or D
        playerMove(1);
    } else if (event.keyCode === 40 || event.keyCode === 87) { // Down or W
        playerDrop();
    } else if (event.keyCode === 38 || event.keyCode === 81 || event.keyCode === 83) { // Up, Q, or S (Rotate)
        playerRotate(1);
    } else if (event.keyCode === 32) { // Space (Hard Drop)
        while(!collide(arena, player)) {
            player.pos.y++;
        }
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
});

// --- Scoreboard / Leaderboard Logic ---

const DEFAULT_NAMES = window.DEFAULT_NAMES || ['Arthur', 'Ford', 'Zaphod', 'Trillian', 'Marvin'];

function setRandomDefaultName() {
    const input = document.getElementById('player-name');
    const btn = document.getElementById('submit-score-btn');
    input.value = DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
    btn.textContent = 'SUBMIT SCORE';
    btn.disabled = false;
}

async function loadLeaderboard() {
    try {
        const res = await fetch('/api/scores');
        const data = await res.json();
        const list = document.getElementById('leaderboard-list');
        list.innerHTML = '';
        data.scores.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'leaderboard-entry';
            div.innerHTML = `
                <span class="rank">#${index + 1}</span>
                <span class="name">${escapeHtml(entry.name)}</span>
                <span class="score-val">${entry.score.toLocaleString()}</span>
            `;
            list.appendChild(div);
        });
    } catch (err) {
        console.error('Failed to load leaderboard:', err);
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function submitScore() {
    const nameInput = document.getElementById('player-name');
    const btn = document.getElementById('submit-score-btn');
    const scoreForm = document.getElementById('score-form');
    const scoreConfirm = document.getElementById('score-confirm');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter your name!');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'SUBMITTING...';

    try {
        const res = await fetch('/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, score })
        });

        if (res.ok) {
            // Hide the entire form, show confirmation
            scoreForm.style.display = 'none';
            scoreConfirm.style.display = 'block';
            loadLeaderboard(); // Refresh leaderboard
        } else {
            const errData = await res.json().catch(() => ({}));
            alert('Failed to submit score: ' + (errData.error || 'Unknown error'));
            btn.disabled = false;
            btn.textContent = 'SUBMIT SCORE';
        }
    } catch (err) {
        console.error('Submit error:', err);
        alert('Error submitting score.');
        btn.disabled = false;
        btn.textContent = 'SUBMIT SCORE';
    }
}

// Bind submit button
document.getElementById('submit-score-btn').addEventListener('click', submitScore);

// Allow pressing Enter in the name input to submit
document.getElementById('player-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitScore();
});

// Load leaderboard on page load
loadLeaderboard();

// --- End Scoreboard Logic ---

playerReset();
updateScore();
update();
