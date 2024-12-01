
  

   //NEW------------------------------11/29/2024
   //put at confirm button functionality to display to user recommended stuff
   function displayrecomms() {
    const recommendationsContainer = document.getElementById('recommendationsContainer');
    recommendationsContainer.innerHTML = ''; // Clear previous recommendations

    recommendations.forEach(gameId => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');

        const gameImage = document.createElement('img');
        gameImage.src = `assets/${gameId}.jpg`; // Assuming images are named by gameId
        gameImage.alt = gameId;

        const gameTitle = document.createElement('p');
        gameTitle.textContent = gameId;

        gameElement.appendChild(gameImage);
        gameElement.appendChild(gameTitle);
        recommendationsContainer.appendChild(gameElement);
    });

    // Show the modal
    const recommendationsModal = document.getElementById('recommendationsModal');
    recommendationsModal.style.display = 'block';

    // Close the modal when the user clicks on the close button
    document.getElementById('closeRecommendations').onclick = function() {
        recommendationsModal.style.display = 'none';
    };
   }
















//----------------------------NEW---------------------------
loadGenres();

// reset button functionality
document.getElementById('resetSelection').addEventListener('click', () => {
    picked = [];
    pCounter = 0;
    hasDisplay = 0;
    images.forEach(image => image.classList.remove('selected'));
    modal.style.display = 'none';
});

// confirm button functionality
document.getElementById('confirmSelection').addEventListener('click', () => {
    // Hide the current selection of games
    document.querySelector('.wrapper').style.display = 'none';

    // Assuming you have an array of recommended games dynamically generated
    const recommendedGames = recommendations; // Use the recommendations array

    // Create a container for the recommended games
    const recommendedContainer = document.getElementById('recommendationsContainer');
    recommendedContainer.innerHTML = ''; // Clear previous recommendations
    recommendedContainer.style.display = 'flex';
    recommendedContainer.style.flexWrap = 'wrap';
    recommendedContainer.style.justifyContent = 'center';
    recommendedContainer.style.marginTop = '20px';

    // Iterate over the recommended games and create elements for each
    recommendedGames.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.style.margin = '10px';
        gameDiv.style.textAlign = 'center';

        const gameImg = document.createElement('img');
        gameImg.src = `assets/${game}.jpg`; // Update the path to your images
        gameImg.alt = game;
        gameImg.style.width = '150px';
        gameImg.style.height = '200px';

        const gameTitle = document.createElement('p');
        gameTitle.textContent = game;

        gameDiv.appendChild(gameImg);
        gameDiv.appendChild(gameTitle);
        recommendedContainer.appendChild(gameDiv);
    });

    // Show the recommendations container
    recommendedContainer.style.display = 'block';
});








   
    


    

  


