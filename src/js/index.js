const playerPick = Array.from(document.querySelectorAll('.content > div'));
const signPick = document.querySelector('.sign-pick');
const battle = document.querySelector('.battle');
const player = document.querySelector('.player');
const cpu = document.querySelector('.cpu');
const result = battle.querySelector('.result');
const decision = result.querySelector('h1');
const closeRules = document.querySelector('.rules i');
const rulesPage = document.querySelector('.rules');
const game = document.querySelector('.game');
const GameRules = document.querySelectorAll('.game-rules');
const playButton = document.querySelector('.splash-screen button:first-of-type');
const splashScreen = document.querySelector('.splash-screen');

const duplicatePlayerPick = playerPick.map(pick => pick.cloneNode(true));
const duplicatePlayerPick2 = playerPick.map(pick => pick.cloneNode(true));

const testobject = ['paper', 'scissors', 'rock'];

const testFunc = function (index) {
    // signPick.classList.add('hide');
    signPick.classList.add('slideOutLeft')
    // signPick.classList.remove('slideInLeft');
    battle.classList.add('gameSlideIn');
    battle.classList.remove('slideOutRight');
    player.prepend(duplicatePlayerPick2[index]);
}

const gameWin = function () {
    result.classList.add('flipIn');
    decision.textContent = "you win";
    player.classList.add('win');
}

const gameLose = function () {
    result.classList.add('flipIn');
    decision.textContent = "you lose";
    cpu.classList.add('win');
}

const playerPickPaper = function (cpuPlay) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[cpuPlay]);
    if (testobject[cpuPlay] === 'scissors') {
        gameLose();
    } else if (testobject[cpuPlay] === 'rock') {
        gameWin();
    }
}

const playerPickScissors = function (cpuPlay) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[cpuPlay]);
    // cpu.firstElementChild.classList.add('growIn');
    if (cpuPlay == 0) {
        gameWin();
    } else if (cpuPlay == 2) {
        gameLose();
    }
}

const playerPickRock = function (cpuPlay) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[cpuPlay]);
    if (cpuPlay == 0) {
        gameLose();
    } else if (cpuPlay == 1) {
        gameWin();
    }
}

const unde = function (item, i) {
    const cpuPlay = Math.floor(Math.random() * 3);
    if (item.classList[0] === testobject[cpuPlay]) {
        setTimeout(function () {
            result.classList.add('flipIn');
            decision.textContent = "you draw";
        }, 1200);
    }
    switch (item.classList[0]) {
        case 'paper':
            testFunc(i);
            setTimeout(playerPickPaper, 1200, cpuPlay);
            break;
        case 'scissors':
            testFunc(i);
            setTimeout(playerPickScissors, 1200, cpuPlay);
            break;
        case 'rock':
            testFunc(i);
            setTimeout(playerPickRock, 1200, cpuPlay);
            break;
        default:
            break;
    }
    scoringSystem();
}

playerPick.forEach((pick, i) => {
    pick.addEventListener('click', function () {
        unde(pick, i);
    });
})

const playAgain = function () {
    signPick.classList.remove('slideOutLeft');
    signPick.classList.add('slideInLeft');
    battle.classList.remove('gameSlideIn');
    battle.classList.add('slideOutRight');
    setTimeout(function () {
        player.firstElementChild.remove();
        cpu.firstElementChild.remove();
        cpu.firstElementChild.classList.add('dummy');
        decision.textContent = '';
        player.classList.remove('win');
        cpu.classList.remove('win');
        result.classList.remove('flipIn');
    }, 300);

}

const closerulesModal = function () {
    rulesPage.classList.add('rulesFadeOut');
    rulesPage.classList.remove('rulesFadeIn');
}

const openRulesModal = function () {
    rulesPage.classList.add('rulesFadeIn');
    rulesPage.classList.remove('rulesFadeOut');
}

const gameStart = function () {
    game.classList.add('gameSlideIn');
    const ss = document.querySelectorAll('.sign-wrapper');
    ss.forEach((s, index) => {
        s.classList.add('growIn');
        s.style.animationDelay = `${index/6 + 0.2}s`;
    })

}

const scoringSystem = function () {
    let test = document.querySelector('.score');
    let testValue = parseInt(test.textContent);
    console.log(decision.textContent);
    setTimeout(function () {
        switch (decision.textContent.toLowerCase()) {
            case 'you win':
                testValue += 1;
                test.textContent = testValue;
                break;
            case 'you draw':
                testValue = testValue;
                test.textContent = testValue;
                break;
            case 'you lose':
                if(testValue <= 0) {
                    testValue = 0;
                } else {
                    testValue -= 1;
                    test.textContent = testValue;
                }
                
                break;
            default:
                break;
        }
    }, 1200)
}

result.lastElementChild.addEventListener('click', playAgain);

GameRules.forEach(button => {
    button.addEventListener('click', openRulesModal);
})

playButton.addEventListener('click', gameStart);

closeRules.addEventListener('click', closerulesModal);
