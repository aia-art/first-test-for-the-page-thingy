const imageContainer = document.getElementById('image-container');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const scoreContainer = document.getElementById('score');
const recordContainer = document.getElementById('record');
let score = 0;
let record = loadRecord(); // Load record from JSON file

function loadRecord() {
    const recordFile = 'record.json';
    if (localStorage.getItem(recordFile)) {
        return JSON.parse(localStorage.getItem(recordFile)).record;
    }
    return 0;
}

function saveRecord() {
    const recordFile = 'record.json';
    const recordData = { record: record };
    localStorage.setItem(recordFile, JSON.stringify(recordData));
}

const aiImageFolder = 'ai-images/';
const nonAiImageFolder = 'non-ai-images/';
const aiImages = ['yes1.jpg', 'yes2.jpg', ...]; // Add AI-generated image filenames here
const nonAiImages = ['no1.jpg', 'no2.jpg', ...]; // Add non-AI-generated image filenames here
let currentImageIndex = 0;
let currentImageFolder = aiImageFolder;

function updateImage() {
    const imageElement = document.createElement('img');
    const randomImageIndex = Math.floor(Math.random() * currentImageFolder.length);
    imageElement.src = `${currentImageFolder}${currentImageFolder.length === aiImages.length ? aiImages : nonAiImages}[${randomImageIndex}]`;
    imageElement.alt = 'AI-Generated Image';
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);
}

function updateScore(isAi) {
    if (isAi === (currentImageFolder === aiImageFolder)) {
        score++;
        scoreContainer.textContent = score;
        if (score > record) {
            record = score;
            recordContainer.textContent = record;
            saveRecord(); // Save new record to JSON file
        }
    } else {
        score = 0;
        scoreContainer.textContent = 0;
    }
    currentImageFolder = currentImageFolder === aiImageFolder ? nonAiImageFolder : aiImageFolder;
    currentImageIndex = (currentImageIndex + 1) % currentImageFolder.length;
    updateImage();
}

yesButton.addEventListener('click', () => {
    updateScore('yes');
});

noButton.addEventListener('click', () => {
    updateScore('no');
});

updateImage();
