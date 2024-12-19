import { recommenderSys } from "./recommender.js";
import { picked, resetHasDisplay, resetPCounter } from "./gameSelect.js";
import {modal} from "./gameSelect.js";
import {images} from "./gameSelect.js";



document.addEventListener('DOMContentLoaded', () => {
// Add event listener for the "Confirm" button
document.getElementById('confirmSelection').addEventListener('click', () => {
    recommenderSys(picked);
  //  displayrecomms(recommendations);
    modal.style.display = 'none';
});

// Reset button functionality
document.getElementById('resetSelection').addEventListener('click', () => {
    picked.length = 0;
    resetPCounter();
    resetHasDisplay();
   // pCounter = 0;
   // hasDisplay = 0;
    images.forEach(image => image.classList.remove('selected'));
    modal.style.display = 'none';
});

    // Back button to go back to login page
    document.getElementById('back').addEventListener('click', () => {
        window.location.href = 'mainpage.html';
    });
});
//Display recommended games and remove the selection
function displayrecomms(recommendations) {
   console.log("LINE 117 displayrecomms function --> displaying recommendations: ", recommendations);
    document.querySelector('.wrapper').style.display = 'none';

    const recommendedContainer = document.getElementById('recommendationsContainer');
    recommendedContainer.innerHTML = '';
    recommendedContainer.style.display = 'flex';
    recommendedContainer.style.flexWrap = 'wrap';
    recommendedContainer.style.justifyContent = 'center';
    recommendedContainer.style.marginTop = '20px';

    // Limit to top 6 recommendations
    const topRecommendations = recommendations.slice(0, 10);

    topRecommendations.forEach(game => {
        console.log("LINE 128 displaying each game recommended: ", game);
        const gameDiv = document.createElement('div');
        gameDiv.style.margin = '10px';
        gameDiv.style.textAlign = 'center';

        const gameImg = document.createElement('img');
        gameImg.src = `assets/${game}.jpg`;
        gameImg.alt = game;
        gameImg.style.width = '136px';
        gameImg.style.height = '182px';
        gameImg.style.borderRadius = '8px';
        gameImg.style.transition = 'transform 0.2s';


        gameDiv.appendChild(gameImg);
       
        recommendedContainer.appendChild(gameDiv);
    });

    recommendedContainer.style.display = 'grid';
}

export { displayrecomms };