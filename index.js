//#region challenge 2
/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
//#endregion

//#region challenge 3
/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data

    for (let i = 0; i < games.length; i++){
        

        // create a new div element, which will become the game card

        // add the class game-card to the list
        
        /* another way of implementing elements
        let card = document.createElement("div");
        let current_game = games[i];
        let current_desc = document.createElement("p");
        let current_name = document.createElement("p");
        let current_image = document.createElement("img");

        current_name.innerText = current_game.name;
        current_image.src = current_game.img;
        current_image.classList.add("game-img");
        current_desc.innerText = current_game.description;

        card.appendChild(current_desc);
        card.appendChild(current_name);
        card.appendChild(current_image);
        card.classList.add("game-card");

        const select_element = document.getElementById("games-container");
        select_element.appendChild(card);
        */

        let current_game = games[i];

        let card = document.createElement("div");
       
        const display_game = {
            
            game_name : current_game.name,
            game_backer: current_game.backers,
            game_desc : current_game.description,
            game_image : current_game.img

        };

        const display = `
            <div class = "display_game">
                <img src = ${display_game.game_image} class = "game-img">
                <h1> ${display_game.game_name}</h1>
                <p> ${display_game.game_desc}</p>
                <p> Backers: ${display_game.game_backer}</p>

            </div>
        
        
        `;

        card.innerHTML = display;
        card.classList.add("game-card");

        const select_element = document.getElementById("games-container");
        select_element.appendChild(card);

        // set the inner HTML using a template literal to display some info 
        // about each game


        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

//#endregion   

//#region challenge 4
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const total_backers = GAMES_JSON.reduce((acc, game) => { return acc + game.backers;}, 0);

contributionsCard.innerText = total_backers;

//set the inner HTML using a template literal and toLocaleString to get a number with commas

const formatted_backers = total_backers.toLocaleString("en-US");

contributionsCard.innerText = formatted_backers;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_contributions = GAMES_JSON.reduce((acc, game) => { return acc + game.pledged;}, 0);

// set inner HTML using template literal

const formatted_contr = total_contributions.toLocaleString("en-US");


raisedCard.innerText = "$ " + formatted_contr;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const total_games = GAMES_JSON.length;

gamesCard.innerText = total_games;

//#endregion

//#region challenge 5
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let list_of_unfunded_games = GAMES_JSON.filter ( (game) => { return game.pledged <= game.goal;});

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(list_of_unfunded_games);
    console.log(list_of_unfunded_games);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let list_of_funded_games = GAMES_JSON.filter ( (game) => { return game.pledged >= game.goal;});   


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(list_of_funded_games);
    console.log(list_of_funded_games);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

//#endregion

//#region challenge 6
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/


// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

let unfunded_games = GAMES_JSON.filter ( (game) => { return game.pledged <= game.goal;});
let total_unfunded = unfunded_games.length;

//test value for tenary operator
//let total_unfunded = 1;


// create a string that explains the number of unfunded games using the ternary operator

const display_str = `A total of $ ${formatted_contr} has been raised for ${total_games} games. Currently, ${total_unfunded > 1 ? total_unfunded + (" ") + "games remain unfunded. We need your help to fund these amazing games!"
 : total_unfunded + (" ") + "game remains unfunded. We need your help to fund these amazing games!"}`;

let desc_info = document.createElement("p");
desc_info.innerText = display_str;

descriptionContainer.appendChild(desc_info);




// create a new DOM element containing the template string and append it to the description container

//#endregion


//#region challenge 7
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */



const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

let game_1, game_2, rest;

[game_1, game_2, ...rest] = sortedGames;

console.log(game_1);
console.log(game_2);
console.log(rest);

// create a new element to hold the name of the top pledge game, then append it to the correct element

let top_game_name1 = document.createElement("p");
top_game_name1.innerText = game_1.name;
firstGameContainer.appendChild(top_game_name1);

let top_game_name2 = document.createElement("p");
top_game_name2.innerText = game_2.name;
secondGameContainer.appendChild(top_game_name2);

// do the same for the runner up item

document.title = "Sea Monster Treasury";

//#endregion