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



const test2 = function (min, max) {
    //  get a random integer between two values
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min + max));
}

const duplicatePlayerPick = playerPick.map(pick => pick.cloneNode(true));
const duplicatePlayerPick2 = playerPick.map(pick => pick.cloneNode(true));

playerPick.forEach((item, i) => {
    item.addEventListener('click', () => {
        const cpuPlay = test2(0, 3);
        switch (item.classList[0]) {
            case 'paper':
                signPick.classList.add('hide');
                battle.classList.add('show');
                player.prepend(duplicatePlayerPick2[i]);
                setTimeout(function () {
                cpu.firstElementChild.classList.remove('dummy');
                cpu.prepend(duplicatePlayerPick[cpuPlay]);
                if (cpuPlay == 0) {
                    result.classList.add('show');
                    decision.textContent = "you draw";
                } else if (cpuPlay == 1) {
                    result.classList.add('show');
                    decision.textContent = "you lose";
                } else if (cpuPlay == 2) {
                    result.classList.add('show');
                    decision.textContent = "you win";
                }
            }, 500);
                break;

            case 'scissors':
                signPick.classList.add('hide');
                battle.classList.add('show');
                player.prepend(duplicatePlayerPick2[i]);
                setTimeout(function () {
                    cpu.firstElementChild.classList.remove('dummy');
                    cpu.prepend(duplicatePlayerPick[cpuPlay]);
                    if (cpuPlay == 0) {
                        result.classList.add('show');
                        decision.textContent = "you win";
                    } else if (cpuPlay == 1) {
                        result.classList.add('show');
                        decision.textContent = "you draw";
                    } else if (cpuPlay == 2) {
                        result.classList.add('show');
                        decision.textContent = "you lose";
                    }
                }, 500);

                break;
            case 'rock':
                signPick.classList.add('hide');
                battle.classList.add('show');
                player.prepend(duplicatePlayerPick2[i]);
                setTimeout(function () {
                cpu.firstElementChild.classList.remove('dummy');
                cpu.prepend(duplicatePlayerPick[cpuPlay]);
                if (cpuPlay == 0) {
                    result.classList.add('show');
                    decision.textContent = "you lose"
                } else if (cpuPlay == 1) {
                    result.classList.add('show');
                    decision.textContent = "you win"
                } else if (cpuPlay == 2) {
                    result.classList.add('show');
                    decision.textContent = "you draw"
                }
            }, 500);
                break;

            default:
                break;
        }
    })
})

result.addEventListener('click', () => {
    battle.classList.remove('show');
    signPick.classList.remove('hide');
    player.firstElementChild.remove();
    cpu.firstElementChild.remove();
    cpu.firstElementChild.classList.add('dummy');
    decision.textContent ='';
})


closeRules.addEventListener('click', () => {
    rulesPage.classList.remove('show');
    game.classList.add('show');
})

GameRules.forEach(button => {
    button.addEventListener('click', () => {
        rulesPage.classList.add('show');
        game.classList.remove('show');
        splashScreen.classList.add('hide');
    })
})


playButton.addEventListener('click', () => {
    splashScreen.classList.add('hide');
    game.classList.add('show');
})