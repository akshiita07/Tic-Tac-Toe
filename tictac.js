console.log("WELCOME TO AKKIGAMES.COM ")

//Get all audios
let music= new Audio('ting.mp4');
let backgroundMusic= new Audio('bgaudio.mp3');
let winnerMusic= new Audio('champion.mp4');
backgroundMusic.volume=0.19;
music.volume=1;

//do not stop game
let stopGame=false;

//FUNCTION TO CHANGE TURN FROM X TO O

//BY DEF STARTING TURN WILL BE OF X
let turn="X";

const changeTurn=()=>{
    return turn === "X"? "O":"X"
}


//FUNCTION TO CHANGE check the winnner
const checkWinner=()=>{

    //all winning conditions
    let wins=[
        //TO GET A LINE OVER WHENEVER I WIN
        [0,1,2,1,3.5,0],
        [3,4,5,1,10.5,0],
        [6,7,8,1,17.5,0],
        [0,3,6,-6,11,90],
        [1,4,7,1,11,90],
        [2,5,8,8,11,90],
        [0,4,8,1,11,45],
        [2,4,6,1,10,-45]
    ]
    let textBox=document.getElementsByClassName('box-text');
    
    wins.forEach(e=>{
        
        if((textBox[e[0]].innerText===textBox[e[1]].innerText) && (textBox[e[1]].innerText===textBox[e[2]].innerText) &&(textBox[e[0]].innerText!==''))
        {
            stopGame=true
            backgroundMusic.pause();    
            document.getElementsByClassName('player-info')[0].innerText="Congratulations "+ textBox[e[0]].innerText + " WON!";
            winnerMusic.play();
            document.getElementById('win-gif').style.width="10vw";
            
            //TO GET A LINE OVER WHENEVER I WIN
            document.querySelector('.line').style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector('.line').style.width="19vw";

           
        }
    })
    
}

//ADDING EVENT OM CLICKING BOX
let box=document.getElementsByClassName("boxes");
Array.from(box).forEach(element=>{
    
    let textBox=element.querySelector('.box-text');

    element.addEventListener('click',()=>{
        backgroundMusic.play();

        if(textBox.innerText === ''){
            textBox.innerText = turn; //X
            //also run audios whenevr someone plays
            music.play();

            //then change turn
            turn = changeTurn();


            //also run fnc to check any winner
            checkWinner();
            // console.log("inside if ")

            if(!stopGame){
                document.getElementsByClassName('player-info')[0].innerText="Turn for "+ turn;
                // console.log("inside if if")
            }
        }

    
        // console.log("inside else")
    })


})


//adding reset button
let resetAll= document.getElementById('reset');
resetAll.addEventListener('click',()=>{
    winnerMusic.pause();
    backgroundMusic.pause();
    
    let textBox=document.getElementsByClassName('box-text');
    Array.from(textBox).forEach(element=>{
        element.innerText=" ";

    })
    turn="X";
    stopGame=false;
    document.getElementsByClassName('player-info')[0].innerText="Turn for "+ turn;
    document.getElementById('win-gif').style.width="0vw";
    document.querySelector('.line').style.width="0";

})