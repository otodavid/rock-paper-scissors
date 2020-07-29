const playerPick = Array.from(document.querySelectorAll('.content > div'));
const signPick = document.querySelector('.sign-pick');
const battle = document.querySelector('.battle');
const player = document.querySelector('.player');
const cpu = document.querySelector('.cpu');
const result = battle.querySelector('.result');
const decision = result.querySelector('h1');
const closeRulesBtn = document.querySelector('.rules i');
const rulesPage = document.querySelector('.rules');
const game = document.querySelector('.game');
const rulesBtn = document.querySelectorAll('.rules-btn');
const playBtn = document.querySelector('.intro button:first-of-type');
const intro = document.querySelector('.intro');

const duplicatePlayerPick = playerPick.map(pick => pick.cloneNode(true));
// true so as to copy child nodes as well
const duplicatePlayerPick2 = playerPick.map(pick => pick.cloneNode(true));

const allSigns = ['paper', 'scissors', 'rock'];

const battleAnimation = function (index) {
    signPick.classList.remove('slideInLeft');
    signPick.classList.add('slideOutLeft');
    battle.className = 'battle SlideInRight';
    player.prepend(duplicatePlayerPick2[index]);
}

const gameWin = function () {
    setTimeout(() => {
        if (screen.width > 1000) {
            result.classList.add('sizeIncrease');
        }
        result.classList.add('flipIn');
        decision.textContent = "you win";
        player.classList.add('winner');
    }, 1000);

}

const gameLose = function () {
    setTimeout(() => {
        if (screen.width > 1000) {
            result.classList.add('sizeIncrease');
        }
        result.classList.add('flipIn');
        decision.textContent = "you lose";
        cpu.classList.add('winner');
    }, 1000);
}

const gameDraw = function () {
        setTimeout(() => {
            if (screen.width > 1000) {
                result.classList.add('sizeIncrease');
            }
            result.classList.add('flipIn');
            decision.textContent = "you draw";
        }, 1000);
}

const playerPickPaper = function (index) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[index]);
    if (screen.width > 1000) {
        battle.className = 'battle compAnimation';
    }
    if (allSigns[index] === 'scissors') {
        gameLose();
    } else if (allSigns[index] === 'rock') {
        gameWin();
    } else {
        gameDraw();
    }
}

const playerPickScissors = function (index) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[index]);
    if (screen.width > 1000) {
        battle.className = 'battle compAnimation';
    }
    if (index == 0) {
        gameWin();
    } else if (index == 2) {
        gameLose();
    } else {
        gameDraw();
    }
}

const playerPickRock = function (index) {
    cpu.firstElementChild.classList.remove('dummy');
    cpu.prepend(duplicatePlayerPick[index]);
    if (screen.width > 1000) {
        battle.className = 'battle compAnimation';
    }
    if (index == 0) {
        gameLose();
    } else if (index == 1) {
        gameWin();
    } else {
        gameDraw();
    }
}

const signSelected = function (item, i) {
    // get a random value between 0 and 2 and use it as index for any sign picked;
    const cpuPlay = 0;
    
    switch (item.classList[0]) {
        case 'paper':
            battleAnimation(i);
            setTimeout(playerPickPaper, 1200, cpuPlay);
            break;
        case 'scissors':
            battleAnimation(i);
            setTimeout(playerPickScissors, 1200, cpuPlay);
            break;
        case 'rock':
            battleAnimation(i);
            setTimeout(playerPickRock, 1200, cpuPlay);
            break;
        default:
            break;
    }
    scoringSystem();
}

playerPick.forEach((pick, i) => {
    pick.addEventListener('click', function () {
        signSelected(pick, i);
    });
})

const playAgain = function () {
    signPick.classList.remove('slideOutLeft');
    signPick.classList.add('slideInLeft');
    battle.className = 'battle compAnimationRev';

    setTimeout(() => {
        player.firstElementChild.remove();
        cpu.firstElementChild.remove();
        cpu.firstElementChild.classList.add('dummy');
        decision.textContent = '';
        player.classList.remove('winner');
        cpu.classList.remove('winner');
        result.classList.remove('flipIn', 'sizeIncrease');
    }, 300);
}

const closerulesModal = function () {
    rulesPage.classList.add('slideOutTop');
    rulesPage.classList.remove('slideInTop');
}

const openRulesModal = function () {
    rulesPage.classList.add('slideInTop');
    rulesPage.classList.remove('slideOutTop');
}

const gameStart = function () {
    intro.classList.add('slideOutLeft');
    game.classList.add('SlideInRight');
    playerPick.forEach((pick, index) => {
        pick.classList.add('growIn');
        pick.style.animationDelay = `${index/6 + 0.2}s`;
    })
}

const scoringSystem = function () {
    let score = document.querySelector('.score');
    let scoreValue = parseInt(score.textContent);
    setTimeout(function () {
        switch (decision.textContent.toLowerCase()) {
            case 'you win':
                scoreValue += 1;
                score.textContent = scoreValue;
                break;
            case 'you draw':
                scoreValue = scoreValue;
                score.textContent = scoreValue;
                break;
            case 'you lose':
                if (scoreValue <= 0) {
                    scoreValue = 0;
                } else {
                    scoreValue -= 1;
                    score.textContent = scoreValue;
                }
                break;
            default:
                break;
        }
    }, 1200)
}

result.lastElementChild.addEventListener('click', playAgain);

rulesBtn.forEach(button => {
    button.addEventListener('click', openRulesModal);
})

playBtn.addEventListener('click', gameStart);

closeRulesBtn.addEventListener('click', closerulesModal);
