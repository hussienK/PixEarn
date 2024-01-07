function animate(frames, character, currentFrame){
    let frameCount = frames.length;
    
    // Set the background image and position for the current frame
    let img = frames[currentFrame - 1];
    character.style.backgroundImage = `url('${img}')`;

    // Move to the next frame or go back to the first frame
    currentFrame = (currentFrame % frameCount) + 1;
    setTimeout(() => animate(frames, character, currentFrame), 100);
}

function moveLeftAndRight(character, parentID, dir, animLeft, animRight){
    let marginLeft = parseInt(character.style.marginLeft, 10);
    var parentRect = document.getElementById(parentID).getBoundingClientRect();
    let currentMargin = marginLeft || parentRect.left - 10;

    let newMargin = 0;
    if ((marginLeft + 90) >= parentRect.right){
        dir = -1;
        character.style.transform = 'scaleX(-1)';
        newMargin = parentRect.right - 1 - 90;
        animate(animRight, character, 1);
    }
    else if (marginLeft <= parentRect.left){
        character.style.transform = 'scaleX(1)';
        dir = 1;
        newMargin = parentRect.left + 1;
        animate(animLeft, character, 1);
    }
    else{
        if (dir == 1){
            newMargin = currentMargin + 10;
        }
        else{
            newMargin = currentMargin - 10;
        }
    }

    character.style.marginLeft = newMargin + "px";

    setTimeout(() => moveLeftAndRight(character, parentID, dir, animLeft, animRight), 100);
}

function CreateAnim(nbFrames, baseAninName, srcFile){
    var animFrames = [];
    for (var i = 1; i <= nbFrames; i++){
        animFrames.push(srcFile + "/" + baseAninName + i + ".png");
    }
    return animFrames;
}

var character1 = document.getElementById("char");
character1.style.display = "inline";
var character1Run = CreateAnim(8, "Run", "../imgs/Characters/Char1/Run")
var character1RunBack = CreateAnim(8, "Run", "../imgs/Characters/Char1/RunBack")
animate(character1Run, character1, 1);
moveLeftAndRight(character1, "hr2", 1, character1Run, character1RunBack);

var character2 = document.getElementById("char2");
character2.style.display = "inline";
var character2Run = CreateAnim(8, "Run", "../imgs/Characters/Char2/RunBack")
var character2RunBack = CreateAnim(8, "Run", "../imgs/Characters/Char2/Run")
animate(character2Run, character2, 1);
moveLeftAndRight(character2, "hr1", 1, character2Run, character2RunBack);