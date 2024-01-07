const jsonFilePath = '../rsrcs/games.json';
var data;

// Fetch the JSON file using the Fetch API and handle possible errors
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonObject => {
    data = jsonObject;
    GenerateGames()
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
  });

//function to open game when clicked, the code sends the position of the game in the json array using the page link
function openGame(thisItem){
  window.location.href = './gamePlay.html?data=' + thisItem.innerText;
}

//generate the game element filled with data from json file
function GenerateGames(){
  //get the grid item
    var mainGrid = document.querySelector(".GridForItems");
    var length = data['Games'].length;

    //loop through all game data's avaliable
    for (var i = 0; i < length; i++){
        //get each element from html and assign it's correct value from the json file
        let gridItem = document.createElement("div");
        gridItem.classList.add("GridItem");

        let gameTitle = document.createElement("h2");
        gameTitle.textContent = data['Games'][i]["Name"];
        gridItem.appendChild(gameTitle);

        let gameImage = document.createElement("img");
        gameImage.alt = "the image of the game"
        gameImage.src = data['Games'][i]["Image"];
        gridItem.appendChild(gameImage);

        let gameDescription = document.createElement("p");
        gameDescription.textContent = data['Games'][i]["ShortDescription"];
        gridItem.appendChild(gameDescription);

        let gameRewards = document.createElement("p");
        gameRewards.classList.add("rewards");
        let gameRewards1 = document.createElement("strong");
        gameRewards1.textContent = "Rewards: "
        gameRewards.appendChild(gameRewards1);
        let gameRewards2 = document.createElement("span");
        gameRewards2.classList.add("reward-text");
        gameRewards2.textContent = data['Games'][i]["Reward"];
        gameRewards.appendChild(gameRewards2);
        gridItem.appendChild(gameRewards);

        //hidden element to save the game link
        let gameLink = document.createElement("div");
        gameLink.innerText = i;
        gameLink.style.display = "none";
        gridItem.appendChild(gameLink);

        //add the final item to the link
        mainGrid.appendChild(gridItem);
        
        //adds the open on click funtion to element
        gridItem.addEventListener("click", ()=>{openGame(gameLink);});
    }
}

