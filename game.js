class Connect5Game {
    constructor(size = 20) {
        this.size = size;
        this.board = Array(size).fill().map(() => Array(size).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = null;
    }

    makeMove(row, col) {
        if (this.gameOver || !this.isValidMove(row, col)) return false;
        
        this.board[row][col] = this.currentPlayer;
        
        if (this.checkWin(row, col)) {
            this.gameOver = true;
            this.winner = this.currentPlayer;
            return true;
        }
        
        this.currentPlayer = 3 - this.currentPlayer;
        return true;
    }

    isValidMove(row, col) {
        return row >= 0 && row < this.size && 
               col >= 0 && col < this.size && 
               this.board[row][col] === 0;
    }

    checkWin(row, col) {
        const directions = [
            [[0, 1], [0, -1]],  // Horizontal
            [[1, 0], [-1, 0]],  // Vertical
            [[1, 1], [-1, -1]], // Diagonal \
            [[1, -1], [-1, 1]]  // Diagonal /
        ];

        const player = this.board[row][col];

        for (const [plus, minus] of directions) {
            let count = 1;

            for (const [dx, dy] of [plus, minus]) {
                let x = row + dx;
                let y = col + dy;
                
                while (x >= 0 && x < this.size && 
                       y >= 0 && y < this.size && 
                       this.board[x][y] === player) {
                    count++;
                    x += dx;
                    y += dy;
                }
            }

            if (count >= 5) return true;
        }
        return false;
    }

    reset() {
        this.board = Array(this.size).fill().map(() => Array(this.size).fill(0));
        this.currentPlayer = 1;
        this.gameOver = false;
        this.winner = null;
    }
}

// Game Initialization
let game = new Connect5Game();
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

// Create board UI
function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < game.size; i++) {
        for (let j = 0; j < game.size; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
        }
    }
}

// Handle cell clicks
// Modify your existing JavaScript
function handleCellClick(e) {
    if (game.gameOver) return;
    
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.col);
    
    if (game.makeMove(row, col)) {
        updateBoard();
        if (game.gameOver) {
            showVictoryOverlay();
            statusElement.textContent = `Player ${game.winner} wins!`;
        } else {
            statusElement.textContent = `Player ${game.currentPlayer}'s turn`;
        }
    }
}

// Add these new functions
function showVictoryOverlay() {
    const overlay = document.getElementById('victoryOverlay');
    const message = document.getElementById('victoryMessage');
    message.textContent = `Player ${game.winner} Wins!`;
    overlay.classList.add('active');
}

function resetGame() {
    game.reset();
    updateBoard();
    statusElement.textContent = "Player 1's turn";
    const overlay = document.getElementById('victoryOverlay');
    overlay.classList.remove('active');
}

// Remove the original reset button styling from CSS and use the new-game-btn style

// Initialize game
createBoard();
updateBoard();
