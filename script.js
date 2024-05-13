const imageContainer = document.getElementById('image-container');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const scoreContainer = document.getElementById('score');
const recordContainer = document.getElementById('record');
let score = 0;
let record = 0;

const images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg']; // Add your image filenames here
const aiImages = ['yes', 'no']; // Add 'yes' for AI-generated images, 'no' for non-AI-generated images
let currentImageIndex = 0;

function updateImage() {
    const imageElement = document.createElement('img');
    imageElement.src = `images/${images[currentImageIndex]}`;
    imageElement.alt = 'AI-Generated Image';
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);
}

function updateScore(isAi) {
    if (isAi === aiImages[currentImageIndex]) {
        score++;
        scoreContainer.textContent = score;
        if (score > record) {
            record = score;
            recordContainer.textContent = record;
        }
    } else {
        score = 0;
        scoreContainer.textContent = 0;
    }
}

function startGame() {
    updateImage();
    yesButton.addEventListener('click', () => {
        updateScore('yes');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });
    noButton.addEventListener('click', () => {
        updateScore('no');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });
}

startGame();
