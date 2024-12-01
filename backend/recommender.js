import { gameGenres } from './loadGenres.js';
import { displayrecomms } from './displays.js';


//jaccard similarity alg
function jaccardSimilarity(setA, setB){
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return intersection.size / union.size;
}





// Get similar users based on preference of similar user preferences
function getSimilarUsers(currentUser, userPrefs) {
    const currentUserPrefs = userPrefs[currentUser];
    const currentUserGenres = new Set(Object.keys(currentUserPrefs).flatMap(genre => currentUserPrefs[genre]));

    let similarityScores = {};

    Object.keys(userPrefs).forEach(user => {
        if (user !== currentUser) {
            const otherUserPrefs = userPrefs[user];
            const otherUserGenres = new Set(Object.keys(otherUserPrefs).flatMap(genre => otherUserPrefs[genre]));
            const similarity = jaccardSimilarity(currentUserGenres, otherUserGenres);
            similarityScores[user] = similarity;
        }
    });

    // Define a similarity threshold
    const similarityThreshold = 0.1; // Adjust this value as needed

    // Find all users with similarity above the threshold
    return Object.keys(similarityScores).filter(user => similarityScores[user] > similarityThreshold);
}







//last step is recommending games for the user based on preference of similar user preferences
  // Recommend games for the user based on preference of similar user preferences
  function recommendGamesForUser(currentUser, userPrefs, similarUsers) {
    const currentUserPrefs = userPrefs[currentUser];
    const currentUserGenres = new Set(Object.keys(currentUserPrefs).flatMap(genre => currentUserPrefs[genre]));

    const recommendations = new Set(); // Use a Set to avoid duplicates

    similarUsers.forEach(similarUsers => {
        const similarUserPrefs = userPrefs[similarUsers];
        Object.keys(similarUserPrefs).forEach(genre => {
            similarUserPrefs[genre].forEach(gameId => {
                if (!currentUserGenres.has(gameId)) {
                    recommendations.add(gameId); // Add to Set
                }
            });
        });
    });

    console.log(`Recommended games for user ${currentUser} based on preferences of similar users:`, Array.from(recommendations));
    displayrecomms(Array.from(recommendations));
}







//recommend games which are unpicked
function recommenderSys(picked) {
    const genreCount = {};
    let recommendations = [];

    picked.forEach(game => {
        const genres = gameGenres[game.id];
        for (const genre in genres) {
            if (genreCount[genre]) {
                genreCount[genre] += genres[genre];
            } else {
                genreCount[genre] = genres[genre];
            }
        }
    });

    console.log("Selected genre count:", genreCount);

    const mostCommonGenre = Object.keys(genreCount).reduce((a, b) => genreCount[a] > genreCount[b] ? a : b);
   
    //content filtering
    console.log("Based on your selection, we recommend more games from the genre:", mostCommonGenre);
    recommendations = [];
    for (let game in gameGenres) {
        if (gameGenres[game][mostCommonGenre] && !picked.some(p => p.id === game)) {
            recommendations.push(game);
        }
    }
    //console.log("Recommended games:", recommendations);--------------------------------------------

    
    // Store user preferences and call collaborative filtering
    let user = localStorage.getItem('currentUser');
    if (user) {
        let userPrefs = JSON.parse(localStorage.getItem('userPrefs')) || {};

        // Clear existing preference to only show most recent preferences for the user
        userPrefs[user] = {};

        picked.forEach(game => {
            const genres = gameGenres[game.id];
            for (const genre in genres) {
                if (!userPrefs[user][genre]) {
                    userPrefs[user][genre] = [];
                }
                if (!userPrefs[user][genre].includes(game.id)) {
                    userPrefs[user][genre].push(game.id);
                }
            }
        });

        localStorage.setItem('userPrefs', JSON.stringify(userPrefs));
        console.log(`User ${user} preferences updated:`, userPrefs[user]);

        // Collaborative filtering call
        if (Object.keys(userPrefs).length >= 1) {
            //new 
            console.log("collaborative filtering entered");
            const similarUsers = getSimilarUsers(user, userPrefs); // Call getSimilarUsers to get the list of similar users
            if(similarUsers.length >= 1){
                console.log("enough users for collaborative filter.");
            recommendGamesForUser(user, userPrefs,similarUsers); // Pass similarUsers correctly
        } else {
            console.log('INNER Not enough users for collaborative filtering. switching to CONTENT BASED FILTERING');
            displayrecomms(recommendations);
        }
    }else{
        console.log("OUTER Not enough users for collaborative filtering.");
    }
   }
}




export { jaccardSimilarity, getSimilarUsers, recommendGamesForUser, recommenderSys };