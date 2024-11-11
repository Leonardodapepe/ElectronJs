const { ipcRenderer } = require('electron');

// Autoplay the background music
window.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('assets/xmasmusic.mp3');
    audio.loop = true;  // Set the music to loop
    audio.play().catch(error => {
        console.log("Auto-play was blocked:", error);
    });
});

// Handle close button click
document.getElementById('close-button').addEventListener('click', () => {
    ipcRenderer.send('close-app');
});