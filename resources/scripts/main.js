const inputs = document.querySelectorAll('input');//All inputs
const btnGame = document.querySelector('.newGame');//btn new game
const containerForm = document.querySelector('.container__form');//form container
const containerGame = document.querySelector('.container__game');//game 
const containerModeGame = document.querySelector('.container__mode'); 
const containersTypeGame = document.querySelectorAll('.container__type');
const containerPlayWithComputer = document.querySelector('.container__playComputer');
let users = [];
let user1V = {};
let user2V = {};

//this function creates new users
const newUser = (name,state,value) => {
    return {name,state,value}
}

//this function checks inputs (inputs validation) in form
const playGame = (() => {

    function alertInput(){
        if(this.value.length === 0){
            
            this.parentNode.lastElementChild.textContent = 'User name cannot be empty'; // write the message in the div
            //this.parentNode.lastElementChild.classList.add('alert'); //add the alert class to the div
    
            this.classList.add('input-alert'); //add the input-alert class to the input
        
        }else{
            
            this.parentNode.lastElementChild.textContent = ''; // remove the message in the div
            this.classList.remove('input-alert'); // remove the input-alert class
        
        }
    };
    
    //this functions checks all of the inputs
    function checkInputs(arryOfInputs){
       
        arryOfInputs.forEach(input => {
            
            if(input.value.length === 0){
                
                input.parentNode.lastElementChild.textContent = 'User name cannot be empty';// write the message in the div
                //input.parentNode.lastElementChild.classList.add('alert');//add the alert class to the div
    
                input.classList.add('input-alert');//add the input-alert class to the input
    
            }
        
        })
    };

    //this function catches the users
    function addUsers(arryOfInputs){
        if(arryOfInputs[1].value!=='' && arryOfInputs[2].value!=='' ){
            let user1 = newUser(arryOfInputs[1].value,true,'X');
            let user2 = newUser(arryOfInputs[2].value,false,'O');

            return [user1,user2];
            
        };
    }
    return {alertInput,checkInputs,addUsers};
    
})();

// this function returns the gameBoard module( the main game )
function game(){

    const gameBoard = ((user1,user2)=>{
        const grids = [];//in this array save all cells
        const btn = document.querySelector('.playAgain');//btn play again
        const score1 = document.getElementById('score1');//score1 user x
        const score2 = document.getElementById('score2');//score2 user o
        let tag = true;
        score1.textContent = 0;
        score2.textContent = 0;
        const newGrid = () =>{
            for(let i = 0; i < 9; i++){
                let cell = document.createElement('div');
                cell.classList.add('cell');
            
                if(user2.name === 'Computer'){
                    cell.addEventListener('click',playWithComputer);
                }else{
                    cell.addEventListener('click',updateOneGrid);
                }    
            
                grids.push(cell);
            
            }
        };
        const cleanGrid = () => {
            const containerGrid = document.querySelector('.container-grid');
            //clean my grid
            while(containerGrid.lastChild){
                containerGrid.removeChild(containerGrid.lastChild)
            }
            //clean grids array
            grids.splice(0,grids.length);
            newGrid();
            renderGrid();
        };
        const renderGrid = () =>{
            const containerGrid = document.querySelector('.container-grid');
            if(!containerGrid){
                const containerGrid = document.createElement('div');
                containerGrid.classList.add('container-grid');
                const previousElement = document.querySelector('.winner');
                previousElement.parentNode.insertBefore(containerGrid,previousElement);
                previousElement.parentElement.removeChild(previousElement);
                grids.forEach(grid => {
                    containerGrid.appendChild(grid);
                
                });
            
            }else{
                grids.forEach(grid => {
                    containerGrid.appendChild(grid);
                
                });
            }
        };
        const updateOneGrid = (e) => {
            if(e.target.textContent === ''){
                if(user1.state){
                    e.target.textContent = user1.value;
                    user1.state = false;
                    user2.state = true;
                    playOneRound(user1);
                
                }else{
                    e.target.textContent = user2.value;
                    user2.state = false;
                    user1.state = true;
                    playOneRound(user2);
                };
            }else{
                return
            
            };
        };
        const gameOver = (user) =>{
            const containerGrid = document.querySelector('.container-grid');
            let div = document.createElement('div');
            div.classList.add('winner');
            let p = document.createElement('div');
            if(user){
                p.textContent = `${user.name} Win!. Do you want to play Again?`;
            }else{
                p.textContent = `It's a tie. Do you want to play Again?`;
            }
            div.appendChild(p);
            containerGrid.parentNode.insertBefore(div,containerGrid);
            containerGrid.parentNode.removeChild(containerGrid);
            btn.style.display = 'block';
            user.value === 'X'? score1.textContent++:score2.textContent++;
        };
        const playOneRound = (user) =>{//this function generates a win
            let values = grids.map(val=>val.textContent);
            if((values[0]!== '' && values[0]===values[1]&& values[0]===values[2]) ||
                (values[0]!== '' && values[0]===values[3]&& values[0]===values[6]) ||
                (values[0]!== '' && values[0]===values[4]&& values[0]===values[8]) ||
                (values[1]!== '' && values[1]===values[4]&& values[1]===values[7]) ||
                (values[2]!== '' && values[2]===values[4]&& values[2]===values[6]) ||
                (values[2]!== '' && values[2]===values[5]&& values[2]===values[8]) ||
                (values[3]!== '' && values[3]===values[4]&& values[3]===values[5]) ||
                (values[6]!== '' && values[6]===values[7]&& values[6]===values[8])
            ){      
                    tag = false;
                    gameOver(user);
            }else if(values.every(cell => cell!=='')){
                    gameOver();
            }
        };
        const playWithComputer = (e) => {
            if(e.target.textContent === ''){
                if(user1.state){
                    e.target.textContent = user1.value;
                
                    playOneRound(user1);
                    
                    user1.state = false;
                    console.log((tag));
                    if(tag){
                        setTimeout(()=>{
                            computerPlay(user2.value);
                            playOneRound(user2);
                            user1.state = true;
                        },1000);
                    }                    
                };
            }else{
                return
            
            }
        };
        const computerPlay = (value) => {
            let num = Math.floor(Math.random()*9);
            if(grids[num].textContent === ""){
                grids[num].textContent = value;
            }else if(grids.some(grid => grid.textContent === "")){
                computerPlay(value);
            }else{
                return;
                
            }
        };

        //btn play again 
        btn.addEventListener('click',function(){
            gameBoard.renderGrid();
            gameBoard.cleanGrid();
            btn.style.display = 'none';
            user1.state = true;
            user2.state = false;
            tag = true;
        })    
        return{newGrid,renderGrid,cleanGrid,gameOver}
    })(user1V,user2V);
    return gameBoard;
}


//this function checks if the user wants to play with other user or with the computer
function selectTypeGame(){

    inputs.forEach(input => input.value = "");//clean all imputs
    //if the user want to play with other user
    if(this.id === '2user'){
        //run the btnGame's logic
        containerModeGame.style.display = 'none';
        containerForm.style.display = 'block';

    //if the user want to play with the computer
    }else if(this.id === 'computerUser'){
        const userSelects = document.querySelectorAll('.userSelect');//btns X or O
        const userPrime = document.getElementById('userPrime');// input user name
        
        containerModeGame.style.display = 'none';
        containerPlayWithComputer.style.display = 'block'

        
        userSelects.forEach(userSelect => userSelect.addEventListener('click',(e)=>{
            
           if(userPrime.value.length === 0){//checks if the input is empty
                
            userPrime.parentNode.lastElementChild.textContent = 'User name cannot be empty';// write the message in the div
                //input.parentNode.lastElementChild.classList.add('alert');//add the alert class to the div

            userPrime.classList.add('input-alert');//add the input-alert class to the input

           } else {
                
                value1 = e.target.id === 'userX'? 'X':'O';
                value2 = value1 === 'X'? 'O':'X';

                //creating the user objects
                user1V = Object.assign(user1V,newUser(userPrime.value,true,value1));
                user2V = Object.assign(user2V,newUser('Computer',false,value2));

                
                containerPlayWithComputer.style.display = 'none';
                containerGame.style.display = 'block';

                //call the game; gameTicTacToe it's a module now 
                const gameTicTacToe = game();


                gameTicTacToe.newGrid();
                gameTicTacToe.renderGrid();
            
            }

            
        }))

    }
}

containersTypeGame.forEach(typeGamebtn => typeGamebtn.addEventListener("click",selectTypeGame));





inputs.forEach(input => input.addEventListener('blur', playGame.alertInput)); //inputs alert event

btnGame.addEventListener('click',()=>{
    
    playGame.checkInputs(inputs);//inputs alert event
    
    if(inputs[1].value!=='' && inputs[2].value!=='' ){//if every input is not empty
        users = [...playGame.addUsers(Array.from(inputs))];
        
        containerForm.style.display = 'none';
        containerGame.style.display = 'block';

        user1V = Object.assign(user1V,users[0]);
        user2V = Object.assign(user2V,users[1]);

        const gameTicTacToe = game();

            
        gameTicTacToe.newGrid();
        gameTicTacToe.renderGrid();
    }
    
});



    


