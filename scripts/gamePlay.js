// Retrieve data from the URL
const urlParams = new URLSearchParams(window.location.search);
const dataReceived = urlParams.get('data');
const currentGame = parseInt(dataReceived);

const jsonFilePath = '../rsrcs/games.json';
var data;

// Fetch the JSON file using the Fetch API and handle errors
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonObject => {
    data = jsonObject;
    GeneratePage();
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
  });

//create the page from json file
function GeneratePage(){
        const gameCont = document.getElementById("GameContainer");
        // Create a new iframe element for the game
        const iframeElement = document.createElement('iframe');

        // Set the attributes for the iframe
        iframeElement.setAttribute('frameborder', '0');
        iframeElement.setAttribute('src', data['Games'][currentGame]['Link']);
        iframeElement.width = data['Games'][currentGame]['w'] + 30;
        iframeElement.height = data['Games'][currentGame]['h'] + 30;

        gameCont.style.width = 100 +"%";
        gameCont.style.height = 100 +"vh";

        // Append the iframe to the container
        gameCont.appendChild(iframeElement);

        //modify the page to display info about the game
        document.getElementById("GameTitle").innerText = data['Games'][currentGame]['Name'];
        document.getElementById("GameDescription").innerText = data['Games'][currentGame]['LongDescription'];
        document.getElementById("GameReward").innerText = data['Games'][currentGame]['Reward'];

        //
        window.top.document.title = "PixEarn - " + data['Games'][currentGame]['Name'];
}

//updates the coin counter, same as in main.js
function updateCoinsCounter(amt){
  let myMoney = sessionStorage.getItem("CoinCount");
  let m = parseInt(myMoney);
  let a = parseInt(amt);
  
  // Check if m is NaN or not a number
  if (isNaN(m)) {
    // Set a default value, for example, 0
    m = 450;
  }
  if (isNaN(a)){
    a = 0;
  }
  
  m = m + a;
  sessionStorage.setItem("CoinCount", m);
  let coinsCounter = document.querySelectorAll(".coins-counter");
  for (var i = 0; i < coinsCounter.length; i++){
      coinsCounter[i].style.display = "flex";
      coinsCounter[i].querySelector("p").innerText = m;
  }
}



window.addEventListener('message', function (event) {
  
  // Assuming the message contains the updated score
  const updatedScore = event.data.score;

  if (isNaN(updatedScore)){
    return;}
  if (sessionStorage.getItem("logedIn") == "True"){
    // Update the score on the parent webpage
    updateCoinsCounter(updatedScore);
  }
});