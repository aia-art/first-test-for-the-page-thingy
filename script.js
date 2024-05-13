const imageContainer = document.getElementById('image-container');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const startButton = document.getElementById('start-button');
const livesDisplay = document.getElementById('lives');
const leaderboardContainer = document.getElementById('leaderboard');
const leaderboardLink = document.getElementById('view-leaderboard');

const scoreContainer = document.getElementById('score');
let score = 0;

const recordContainer = document.getElementById('record');
let record = 0;

const lives = 3;

const imageFolders = ['yes', 'no'];
let currentFolderIndex = 0;
let currentImageIndex = 0;

function updateImage() {
    const folder = imageFolders[currentFolderIndex];
    const images = getImagesFromFolder(folder);
    const randomImage = images[getRandomInt(0, images.length - 1)];

    const imageElement = document.createElement('img');
    imageElement.src = `images/${folder}/${randomImage}`;
    imageElement.alt = 'AI-Generated Image';
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);

    currentImageIndex = (currentImageIndex + 1) % images.length;
}

function getImagesFromFolder(folder) {
    return Array.from(new Set([...document.querySelectorAll(`img[src*="${folder}"]`)].map(img => img.src.split('/').pop()))).sort();
}

function updateScore(isAi) {
    if (isAi === currentFolderIndex) {
        score++;
        scoreContainer.textContent = score;
        if (score > record) {
            record = score;
            recordContainer.textContent = record;
        }
    } else {
        lives--;
        livesDisplay.textContent = lives;
        if (lives === 0) {
            gameOver();
        }
    }

    currentFolderIndex = (currentFolderIndex + 1) % imageFolders.length;
    updateImage();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGame() {
    updateImage();
    yesButton.addEventListener('click', () => {
        updateScore(0);
    });
    noButton.addEventListener('click', () => {
        updateScore(1);
    });
}

function gameOver() {
    const name = prompt('Game over! Enter your name:');
    if (name) {
        const date = new Date().toLocaleDateString();
        const leaderboardData = loadLeaderboardData();
        leaderboardData.push({ date, name, score });
        saveLeaderboardData(leaderboardData.sort((a, b) => b.score - a.score));

        leaderboardContainer.innerHTML = `
            <h2>Leaderboard</h2>
            ${leaderboardData.slice(0, 3).map(entry => `
                <div>${entry.name}: ${entry.score} (${entry.date})</div>
            `).join('')}
            <a href="#" id="view-all-link">View All</a>
        `;

        document.getElementById('view-all-link').addEventListener('click', () => {
            leaderboardContainer.innerHTML = `
                <h2>Full Leaderboard</h2>
                ${leaderboardData.map(entry => `
                    <div>${entry.name}: ${entry.score} (${entry.date})</div>
                `).join('')}
            `;
        });

        startButton.style.display = 'none';
        leaderboardLink.style.display = 'none';
    }
}

function loadLeaderboardData() {
    const leaderboardData = localStorage.getItem('leaderboard');
    return leaderboardData ? JSON.parse(leaderboardData) : [];
}

function saveLeaderboardData(leaderboardData) {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
}

startButton.addEventListener('click', startGame);
