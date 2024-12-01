import { recommenderSys } from "./recommender.js";
import { gameGenres } from "./loadGenres.js";

const modal = document.createElement('div');
modal.id = 'confirmationModal';
modal.style.display = 'none';
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
        <p>Are these your final selected games?</p>
        <button id="resetSelection">Reset</button>
        <button id="confirmSelection">Confirm</button>
    </div>
`;
document.body.appendChild(modal);


//array of recommendedgames
let recommendations = [];

let picked = [];
//array for picked games

let ispicked = 0;
//will check if nag balik2 ba ug pili

let pCounter = 0;
//check if already picked 3 games

let hasDisplay = 0;
//boolean if button has already displayed or not

//selectable images all inside div class
let images = document.querySelectorAll('.images img');



//put click function for each pics 
images.forEach(function(image){
    image.addEventListener('click', function(event){

      //some = iterate array of 'picked' and will if it has the same game id from the selected game if true = 1, false = 0
        ispicked = picked.some(game => game.id === this.id) ? 1 : 0;
    
        //if the photo is not selected yet
    if(ispicked !== 1 && pCounter < 6){
        console.log("image name: ",this.id);
        //create object to store in 'picked' array
        const game = {
            id: this.id,
            genre: gameGenres[this.id]
        };
        picked.push(game);
        this.classList.add("selected"); //highlight selected
        console.log(JSON.stringify(picked));
        pCounter++;
    }else if(ispicked ===1){
        picked = picked.filter(game => game.id !== this.id);
        this.classList.remove("selected");
        pCounter--;
        console.log("Removed:", JSON.stringify(picked));

    }

   
     //if the pcounter reaches 6 then finalize button will appear and you will not be able to click new games
    if(pCounter === 6 && hasDisplay !== 1){
        modal.style.display = 'flex';
        hasDisplay = 1;
    }
  });
});
//=======================================================


/*
// Add event listener for the "Confirm" button
document.getElementById('confirmSelection').addEventListener('click', () => {
   recommenderSys(picked);
  //  displayrecomms(recommendations);
    modal.style.display = 'none';
});

// Reset button functionality
document.getElementById('resetSelection').addEventListener('click', () => {
    picked.length = 0;
    pCounter = 0;
    hasDisplay = 0;
    images.forEach(image => image.classList.remove('selected'));
    modal.style.display = 'none';
});

    // Back button to go back to login page
    document.getElementById('back').addEventListener('click', () => {
        window.location.href = 'mainpage.html';
    });

*/


//SELECT GAMES TO STORE IN STORAGE 
function selectGame(gameId, genre) {
    let user = localStorage.getItem('currentUser');
    if (!user){
        console.error('No user logged in');
        return;
    }
    let userPrefs = JSON.parse(localStorage.getItem('userPrefs')) || {};
    if (!userPrefs[user]) {
        userPrefs[user] = {};
    }
    if (!userPrefs[user][genre]) {
        userPrefs[user][genre] = [];
    }
    if (!userPrefs[user][genre].includes(gameId)) {
        userPrefs[user][genre].push(gameId);
    }

    localStorage.setItem('userPrefs', JSON.stringify(userPrefs));
    console.log(`User ${user} selected ${gameId} in genre ${genre}`);
}



function resetPCounter() {
    pCounter = 0;
}

function resetHasDisplay() {
    hasDisplay = 0;
}

export {picked};
export {modal};
export {resetPCounter};
export {images};
export {resetHasDisplay};

  



