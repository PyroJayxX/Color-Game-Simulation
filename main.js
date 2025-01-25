document.getElementById('js-bet-red').value = 0;
document.getElementById('js-bet-yellow').value = 0;
document.getElementById('js-bet-green').value = 0;
document.getElementById('js-initial-money').value = 0;
document.getElementById('js-minutes').value = 0;


function simulate() {
    const resultsTable = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    resultsTable.innerHTML = '';

    const sampleData = generateRoundsData();
  
    sampleData.forEach(data => {
        const row = resultsTable.insertRow();
        row.insertCell(0).innerText = data.round;
        row.insertCell(1).innerText = data.spin;
        row.insertCell(2).innerText = data.ret1;
        row.insertCell(3).innerText = data.ret2;
        row.insertCell(4).innerText = data.ret3;
        row.insertCell(5).innerText = data.outcome;
        row.insertCell(6).innerText = data.balance;
        row.insertCell(7).innerText = data.final;
    });

}

function generateRoundsData() {
    isFieldsNumber(); //sets field to 0 is NaN
    if(!isMinutesZero()){
        return;
    }
    if(!isFieldsPositive()){
        return;
    };

    const tempArray = [];
    
    const betRed = parseInt(document.getElementById('js-bet-red').value);
    const betYellow = parseInt(document.getElementById('js-bet-yellow').value);
    const betGreen = parseInt(document.getElementById('js-bet-green').value);
    const totalBet = betRed + betYellow + betGreen;

    const minutes = parseInt(document.getElementById('js-minutes').value);
    let totalMinutes = 0;
    let initialBalance = parseInt(document.getElementById('js-initial-money').value);
    let finalBalance = initialBalance;
    let i = 1;
    let isWinning = true;

    if (totalBet > initialBalance) {
        alert(`Initial balance: ${initialBalance} should be greater than Total bet: ${totalBet}`);
        return;
    }
    if(totalBet == 0){
        alert('Total bet cannot be 0');
        return;
    }
    
    while(isWinning && i < 256) {
        totalMinutes += minutes;
        const spinNum = getRandomNumber();
        const outcome = () => {
            let red = betRed;
            let yellow = betYellow;
            let green = betGreen;

            if (gameResults(spinNum)[0] == 'lose'){
                red *= -1
            }
            if (gameResults(spinNum)[1] == 'lose'){
                yellow *= -1
            }
            if (gameResults(spinNum)[2] == 'lose'){
                green *= -1
            }
            return red + yellow + green;
        }

        finalBalance += outcome();

        tempArray.push({
            round: i,
            spin: spinNum,
            ret1: gameResults(spinNum)[0],
            ret2: gameResults(spinNum)[1],
            ret3: gameResults(spinNum)[2],
            outcome: outcome(),
            balance: initialBalance,
            final: finalBalance
        });
        initialBalance = finalBalance;
        if (finalBalance <= 0){
            isWinning = false;
            alert(`You lost all your money in ${i} rounds. \nYou played for ${totalMinutes} minutes`);
        }
        i++;
    }

    return tempArray;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 24) + 1;
}

function gameResults(randomNum) {
    const array = [
        ['win', 'win', 'win'],
        ['win', 'win', 'lose'],
        ['win', 'lose', 'win'],
        ['lose', 'lose', 'lose'],
        ['lose', 'win', 'win'],
        ['lose', 'win', 'lose'],
        ['win', 'lose', 'win'],
        ['win', 'lose', 'lose'],
        ['win', 'win', 'win'],
        ['lose', 'win', 'lose'],
        ['lose', 'lose', 'win'],
        ['lose', 'lose', 'lose'],
        ['win', 'win', 'win'],
        ['win', 'win', 'lose'],
        ['win', 'lose', 'win'],
        ['lose', 'lose', 'lose'],
        ['lose', 'win', 'win'],
        ['lose', 'win', 'lose'],
        ['win', 'lose', 'win'],
        ['win', 'lose', 'lose'],
        ['win', 'win', 'win'],
        ['lose', 'win', 'lose'],
        ['lose', 'lose', 'win'],
        ['lose', 'lose', 'lose']
      ]
    return array[randomNum - 1];
}

console.log(gameResults(7));

function isFieldsNumber(){
    const betRed = document.getElementById('js-bet-red');
    const betYellow = document.getElementById('js-bet-yellow');
    const betGreen = document.getElementById('js-bet-green');
    const initialBalance = document.getElementById('js-initial-money');
    const minutes = document.getElementById('js-minutes');   
   
    if (isNaN(parseInt(betRed.value))){
        document.getElementById('js-bet-red').value = 0;
    } 
    if (isNaN(parseInt(betYellow.value))){
        document.getElementById('js-bet-yellow').value = 0;
    } 
    if (isNaN(parseInt(betGreen.value))){
        document.getElementById('js-bet-green').value = 0;
    }
    if (isNaN(parseInt(initialBalance.value))){
        document.getElementById('js-initial-money').value = 0;
    }
}

function isFieldsPositive() {
    const betRedInput = document.getElementById('js-bet-red');
    const betYellowInput = document.getElementById('js-bet-yellow');
    const betGreenInput = document.getElementById('js-bet-green');
    const initialBalanceInput = document.getElementById('js-initial-money');

    const betRed = parseInt(betRedInput.value);
    const betYellow = parseInt(betYellowInput.value);
    const betGreen = parseInt(betGreenInput.value);
    const initialBalance = parseInt(initialBalanceInput.value);

    let flag = true;

    if (betRed < 0) {
        betRedInput.style.border = '1px solid red';
        flag = false;
    } else {
        betRedInput.style.border = '1px solid #ccc';
    }

    if (betYellow < 0) {
        betYellowInput.style.border = '1px solid red';
        flag = false;
    } else {
        betYellowInput.style.border = '1px solid #ccc';
    }

    if (betGreen < 0) {
        betGreenInput.style.border = '1px solid red';
        flag = false;
    } else {
        betGreenInput.style.border = '1px solid #ccc';
    }

    if (initialBalance < 0) {
        initialBalanceInput.style.border = '1px solid red';
        flag = false;
    } else {
        initialBalanceInput.style.border = '1px solid #ccc';
    }

    if (!flag) {
        alert('Please enter a positive number');
        return false;
    }

    return true;
}

function isMinutesZero(){
    const minutes = parseInt(document.getElementById('js-minutes').value);

    const isNotPositive = () => {
        if(minutes == 0){
            return "Minutes cannot be 0.";
        }
        if(minutes < 0){
            return 'Minutes cannot be negative.';
        }
        if(isNaN(minutes)){
            return 'Minutes cannot be empty.';
        }
    }

    if (minutes <= 0 || isNaN(minutes)) {
        alert(`${isNotPositive()} Please enter a valid number.`);
        return false;
    }

    return true;
}