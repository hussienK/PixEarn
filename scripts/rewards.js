const jsonFilePath = '../rsrcs/rewards.json';
var data;
var dataCopy;

// Fetch the JSON file using the Fetch API
fetch(jsonFilePath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(jsonObject => {
    data = jsonObject;
    dataCopy = jsonObject;
    GenerateRewards()
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
  });

//create the function for when something is purshased
function createBuyButtonClickHandler(reward) {
return function () {
    purshase(reward);
};
}

//generate the game element filled with data from json file
function GenerateRewards(){
    //get the json form
    var mainGrid = document.querySelector(".GridForItems");
    var length = data['Rewards'].length;
    //loop through the items
    for (var i = 0; i < length; i++){
        //get the data from json file and create the element
        let gridItem = document.createElement("div");
        gridItem.classList.add("GridItem");

        let rewardName = document.createElement("h2");

        let Name = document.createTextNode(data['Rewards'][i]["Name"] + " ");
        let Rewards = document.createTextNode(data['Rewards'][i]["Value"] + "$");
        let rewardsSpan = document.createElement("span");
        rewardsSpan.classList.add("reward");
        rewardsSpan.appendChild(Rewards);
        
        rewardName.appendChild(Name);
        rewardName.appendChild(rewardsSpan);
        gridItem.appendChild(rewardName);

        let rewardImage = document.createElement("img");
        rewardImage.alt = "the image of the game"
        rewardImage.src = data['Rewards'][i]["Image"];
        gridItem.appendChild(rewardImage);


        let buyButton = document.createElement("button");
        buyButton.type = "button";
        
        let coinImage = document.createElement("img");
        coinImage.alt = "Image of coin";
        coinImage.src = "../imgs/CoinCounter.png";
        coinImage.style = "border: none; width: 30px; height: 30px; margin-left: 5px;"
        let buttonTextSpan = document.createElement("span");
        buttonTextSpan.textContent = data['Rewards'][i]['Price'];

        buyButton.appendChild(buttonTextSpan);
        buyButton.appendChild(coinImage);
        buyButton.style = "display: flex; justify-content: center; align-items: center;"


        //add the buy function to the button
        buyButton.addEventListener("click", createBuyButtonClickHandler(data['Rewards'][i]));

        gridItem.appendChild(buyButton);

        //add the created element to the display grid
        mainGrid.appendChild(gridItem);
    }
}

//get the sorting dropdown selector
let sortSelect = document.getElementById("sort");
//apply the sort when change happens
sortSelect.addEventListener("change", startSort);

function startSort(){
    //get the criteria and sort
    let criteria = sortSelect.options[sortSelect.selectedIndex].text;
    switch (criteria){
        case "Name Ascending":
            SortRewards("Name");
            break;
        case "Value Ascending":
            SortRewards("Value");
            break;
        case "Price Ascending":
            SortRewards("Price");
            break;
        case "Name Descending":
            SortRewardsR("Name");
            break;
        case "Value Descending":
            SortRewardsR("Value");
            break;
        case "Price Descending":
            SortRewardsR("Price");
            break;
        default:
            var mainGrid = document.querySelector(".GridForItems");
            mainGrid.innerHTML = '';
            GenerateRewards();
            break;
    }
}

//sort the items on the page using gived criteria
function SortRewards(criteria){
    data['Rewards'].sort((a, b) => {
        //if sorting using name criteria
        if (criteria == "Name"){
            let ans = a['Name'].localeCompare(b['Name']);
            if (ans != 0){
                return ans;
            }
            //if the name values are equal then sort by values
            return SortRewards("Value");
        }

        //if sorting with a numeric value
        if (a[criteria] < b[criteria]) {
            return -1;
        } else if (a[criteria] > b[criteria]) {
            return 1;
        } else {
            // If values are equal, use the "Name" criteria as a tiebreaker
            return a['Name'].localeCompare(b['Name']);
        }
    });

    //clear the grid
    var mainGrid = document.querySelector(".GridForItems");
    mainGrid.innerHTML = '';

    //regenerate the items using the new sorted data
    GenerateRewards();
}

//sorting the items but in reverse
function SortRewardsR(criteria){
    data['Rewards'].sort((a, b) => {
        //if sorting using name criteria
        if (criteria == "Name"){
            let ans = -1 * a['Name'].localeCompare(b['Name']);
            if (ans != 0){
                return ans;
            }
            return SortRewardsR("Value");
        }

        //if sorting with a numeric value
        if (a[criteria] > b[criteria]) {
            return -1;
        } else if (a[criteria] < b[criteria]) {
            return 1;
        } else {
            // If values are equal, use the "Name" criteria as a tiebreaker
            return -1 * a['Name'].localeCompare(b['Name']);
        }
    });

    //clear the grid
    var mainGrid = document.querySelector(".GridForItems");
    mainGrid.innerHTML = '';

    //regenerate the items using the new sorted data
    GenerateRewards();
}

//get the filtering elements
let filterType = document.getElementById("type");
let applyFiltersButton = document.getElementById("applyFilter");

//apply the filer functions when apply clicked
applyFiltersButton.addEventListener("click", function(){
    filter(filterType.options[filterType.selectedIndex].text, parseInt(rangeInput[0].value), parseInt(rangeInput[1].value));
});

//do the filtering
function filter(name, min, max){
    //reset the data to an old copy
    data = JSON.parse(JSON.stringify(dataCopy));

    //array of values that fits the filter
    var newData = [];
    for (reward in data["Rewards"]){
        //if values apply then add to newData array
        if (name == "Type" || name == "Any" || data["Rewards"][reward]["Name"] == name){
            if (data["Rewards"][reward]["Price"] <= max && data["Rewards"][reward]["Price"] >= min){
                newData.push(data["Rewards"][reward]);
            }
        }
    }
    //replace the data array with the new one
    data["Rewards"] = newData;
    //perform sorting on the new items and regenrate the page
    startSort();
}

//updates the coin counter, same as in main.js
function updateCoinsCounter(){
    let coinsCounter = document.querySelectorAll(".coins-counter");
    for (var i = 0; i < coinsCounter.length; i++){
        coinsCounter[i].style.display = "flex";
        coinsCounter[i].querySelector("p").innerText = sessionStorage.getItem("CoinCount");
    }
}

//if an item is purshased, check for the money amount and and then show the user they've purshased something
function purshase(item){
    if (sessionStorage.getItem("logedIn") == "True"){
        let myMoney = parseInt(sessionStorage.getItem("CoinCount"));
        if (myMoney >= item["Price"]){
            myMoney -= item["Price"];
            sessionStorage.setItem("CoinCount", myMoney+"");
            alert("You have Purshased The " + item["Name"] +" of value " + item["Value"]+"$\n" + "Your Gift card code is: xxxx-xxxx-xxxx",);
            updateCoinsCounter();
        }
    }
}

//dealing with the slider
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 50;

//loop through the inputs
priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        //get the min and max value
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        //adjuft the sliders
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});
//deal with the slider input
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});