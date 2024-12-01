

//initialize json fiel for game genres
let gameGenres = {};

//load game genres from json file
function loadGenres(){
    fetch('gameGenres.json')
    .then(response => response.json())
    .then(data => {
     gameGenres = data;
    })
    .catch(error => console.error('Error loading genres: ', error));
}


//call the function to load the gameGenres jsonfile
loadGenres();

export {gameGenres};
