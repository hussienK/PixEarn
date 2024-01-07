//sets the login data
if (sessionStorage.getItem("logedIn") != "True"){
    sessionStorage.setItem("CoinCount", "999");
}

//get the signing in button and coins counter
const navSign = document.querySelectorAll(".SigningButton");
const coinsCounter = document.querySelectorAll(".coins-counter");

//updates the coin cointer with the current amount of coins
function updateCoinsCounter(){
    for (var i = 0; i < coinsCounter.length; i++){
        coinsCounter[i].querySelector("p").innerText = sessionStorage.getItem("CoinCount");
    }
}

//check if user is signed in and apply the correct button
function CheckForSign(){
    //if user signed in hide the sign in buttons
    if (sessionStorage.getItem("logedIn") == "True"){
        for (var i = 0; i < navSign.length; i++){
            navSign[i] .style.display = "none"; 
        }
        for (var i = 0; i < coinsCounter.length; i++){
            coinsCounter[i].style.display = "flex";
        }
        updateCoinsCounter(); //set correct amount of coins
    }
    //if user not signed in, hide the coin counters
    else{
        for (var i = 0; i < coinsCounter.length; i++){
            coinsCounter[i].style.display = "none";
        }
    }
}

//the mobile menu related elements
const menuButtonOpen = document.getElementById("menu-open");
const menuButtonClose = document.getElementById("menu-close");
const DropDownMenu = document.querySelector(".sub-menu-wrap");

//applies the menu open animation to show it on click
menuButtonOpen.addEventListener("click", function(){
    DropDownMenu.style.animationName = "openMenu";
    DropDownMenu.style.animationDuration = "1s";
    DropDownMenu.style.animationTimingFunction = "linear";
    DropDownMenu.style.animationFillMode = "forwards";

});
//applies the menu hode animation to hide it on click
menuButtonClose.addEventListener("click", function(){
    DropDownMenu.style.animationName = "closeMenu";
    DropDownMenu.style.animationDuration = "1s";
    DropDownMenu.style.animationTimingFunction = "linear";
    DropDownMenu.style.animationFillMode = "forwards";
});

//get the sign in related elements
const SignInMenu = document.querySelector(".SignIn");
const SignUpMenu = document.querySelector(".SignUp");
const signOverlay = document.querySelector(".overlay-popup");
const closeButtonSignIn = document.querySelector(".SignInC");
const Buttons = document.querySelectorAll(".SigningButton");

//enable the sign in menu when buttons clicked
for (var i = 0; i < Buttons.length; i++){
    Buttons[i].addEventListener("click", function(){
        SignInMenu.style.display = "block";
        signOverlay.style.display = "block";
    })
}
//disable the sign in menu when buttons are clicked
closeButtonSignIn.addEventListener("click", function(){
    SignInMenu.style.display = "none";
    signOverlay.style.display = "none";
})

//the sign in form related elements
const submitSignin = document.querySelector(".SubmitSignin");
const loginName = document.querySelector("#loginName");
const loginPassword = document.querySelector("#loginPassword");

//when user clicks sign in
submitSignin.addEventListener("click", function(){
    //if the entered credentials are identical to temp credentials
    if (loginName.value == "admin" && loginPassword.value == "password"){
        //set the signing in variables
        sessionStorage.setItem("logedIn", "True");

        //close the menu
        SignInMenu.style.display = "none";
        signOverlay.style.display = "none";
        //update coin display
        CheckForSign();
    }
    else{
        loginName.value = "";
        loginPassword.value = ""
    }
})

//check for signing when page loads
document.addEventListener("DOMContentLoaded", CheckForSign);
