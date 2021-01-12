// game rules
// - player must guess a number between a min and max
//  - player gets a certain amount of guesses
//  - notify player about remaining guesses
//  - notify player of the correct answer after losing
//  - let player choose to play again


//game values

let min=4,
    max=10,
    winningNum=getWinningNumRandom(min, max),   //make it random 
    guessesLeft=3;
console.log(winningNum);
// UI elements

const game=document.querySelector('#game'),
        minNum=document.querySelector('.min-num'),
        maxNum=document.querySelector('.max-num'),
        guessButton=document.querySelector('#guess-btn'),
        guessInput=document.querySelector('#guess-input');
        message=document.querySelector('.message');

minNum.textContent=min;
maxNum.textContent=max;


// play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className==='replay-button'){
        window.location.reload();
    }
})


// listen for guess button

guessButton.addEventListener('click', function(){

    let guess=parseInt(guessInput.value);
    if(isNaN(guess) || guess< min || guess>max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    //check if player won the game

    if(guess === winningNum){
        gameOver(true,`${winningNum} is the correct answer. You won the Game!`);
    }else{
        //Wronge number entered
        guessesLeft-=1;
        if(guessesLeft === 0){
            gameOver(false, `Game Over! You lost the game. Correct number was ${winningNum}`);
        }else{

            guessInput.style.borderColor='red';

            guessInput.value='';
            //Tell user that its the wronge number
            setMessage(`Wrong guess: You have ${guessesLeft} guesses left.`,'red')
        }
    }
}) 


function gameOver(won,msg){

    let color;
    won === true ? color='green': color='red';
    guessInput.disabled=true;
    guessInput.style.borderColor=color;
    message.style.color=color;
    setMessage(msg);

    //play again
    guessButton.value='Play again';
    guessButton.className += 'replay-button';
}



function getWinningNumRandom(min, max){
    return (Math.floor(Math.random()*(max-min+1)+min));
}


//set message function
function setMessage(msg, color){
    message.style.color=color;
    message.textContent=msg;
}