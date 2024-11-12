const { ipcRenderer } = require('electron');

let isMuted = true;  // Track the mute state
let audio = null;     // Initialize audio variable to null
let isAudioInitialized = false; // New flag to track if audio is initialized

// Autoplay the background music on page load
window.addEventListener('DOMContentLoaded', () => {
    if (!isAudioInitialized) {  // Only create the audio element if it hasn't been created yet
        audio = new Audio('assets/xmasmusic.mp3');
        audio.loop = true; 
        console.log("music started");
        isAudioInitialized = true; // Set the flag to true after initializing audio
    }

    // Initialize countdown
    startCountdown();
});

// Handle close button click
document.getElementById('close-button').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

// Handle mute button click
document.getElementById('mute-button').addEventListener('click', () => {
    isMuted = !isMuted;  // Toggle the mute state

    if (audio) {
        if (isMuted) {
            audio.pause();  
        } else {
            audio.play();   
        }
    }
});

// Function to start the countdown
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    const christmas2024 = new Date('December 25, 2024 00:00:00');

    function updateCountdown() {
        const now = new Date();
        const timeDifference = christmas2024 - now;

        if (timeDifference <= 0) {
            countdownElement.innerText = "Merry Christmas!";
            clearInterval(countdownInterval);  // Stop updating once it's Christmas
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        countdownElement.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s until Christmas 2024`;
    }

    // Update every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();  // Run immediately once on load
}