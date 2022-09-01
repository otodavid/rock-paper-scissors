const app = function () {

    let storage = localStorage.getItem('score');
    const playerPick = Array.from(document.querySelectorAll('.content > div'));
    const signPick = document.querySelector('.sign-pick');
    const battle = document.querySelector('.battle');
    const player = document.querySelector('.player');
    const cpu = document.querySelector('.cpu');
    const result = battle.querySelector('.result');
    const decision = result.querySelector('h1');
    const closeRulesBtn = document.querySelector('.close-rules-btn');
    const rulesPage = document.querySelector('.rules');
    const rulesBtn = document.querySelectorAll('.rules-btn');
    const playBtn = document.querySelector('.play-btn');
    const dropShadow = document.querySelector('.drop-shadow');
    let score = document.querySelector('.score');
    let scoreValue = parseInt(score.textContent);
    const newGameBtn = document.querySelector('.new-game-btn');

    const allSigns = ['paper', 'scissors', 'rock'];

    if (storage > 0) {
        score.textContent = storage;
    }

    document.addEventListener('keydown', (e) => {
        // disable tab key to prevent hidden divs from showing when pressed
        if (e.keyCode === 9) {
            e.preventDefault();
        }
    });

    const startGame = function () {
        const intro = document.querySelector('.intro');
        const game = document.querySelector('.game');
        intro.classList.add('slideOutLeft');
        game.classList.add('slideInRight', 'present');
        intro.classList.remove('present');
        playerPick.forEach((pick, index) => {
            pick.classList.add('growIn');
            pick.style.animationDelay = `${index/6 + 0.2}s`;
        })
    }

    const openRulesModal = function () {
        rulesPage.classList.add('slideInTop');
        rulesPage.classList.remove('slideOutTop');
        dropShadow.classList.add('active');
    }

    const closeRulesModal = function () {
        rulesPage.classList.add('slideOutTop');
        rulesPage.classList.remove('slideInTop');
        dropShadow.classList.remove('active');
    }

    const signSelected = function (item, index) {
        /* get a random value between 0 and 2 (0 inclusive) and use it as index for any sign picked for CPU; */
        const cpuPlay = Math.floor(Math.random() * 3);
        animationAfterplayerPicks(index, cpuPlay);

        setTimeout(() => {
            switch (item.classList[0]) {
                case 'paper':
                    playerPicksPaper(cpuPlay);
                    break;
                case 'scissors':
                    playerPicksScissors(cpuPlay);
                    break;
                case 'rock':
                    playerPicksRock(cpuPlay);
                    break;
                default:
                    break;
            }
            scoringSystem();

            localStorage.setItem('score', scoreValue);
            storage = localStorage.getItem('score');
        }, 2300);
    }

    const animationAfterplayerPicks = function (index, cpuPlay) {
        /* index parameter represents the index number for the sign a player picks while the cpuPlay represents the index number for the sign the CPU picks */
        signPick.classList.remove('slideInLeft');
        signPick.classList.add('slideOutLeft');
        battle.className = 'battle slideInRight';
        const clone = playerPick[index].cloneNode(true);
        player.prepend(clone);

        // animation for CPU pick
        setTimeout(() => {
            cpu.firstElementChild.classList.remove('dummy');
            const clone = playerPick[cpuPlay].cloneNode(true);
            cpu.prepend(clone);
            if (window.outerWidth > 1000) {
                battle.className = 'battle compAnimation';
            }
        }, 1500);
    }

    const playerPicksPaper = function (index) {
        if (allSigns[index] === 'scissors') return gameLose();
        if (allSigns[index] === 'rock') return gameWin();
        gameDraw();
    }

    const playerPicksScissors = function (index) {
        if (allSigns[index] === 'paper') return gameWin();
        if (allSigns[index] === 'rock') return gameLose();
        gameDraw();
    }

    const playerPicksRock = function (index) {
        if (allSigns[index] === 'paper') return gameLose();
        if (allSigns[index] === 'scissors') return gameWin();
        gameDraw();
    }

    const gameWin = function () {
        battleWidthIncrease();
        result.classList.add('flipIn');
        decision.textContent = "you win";
        player.classList.add('winner');
    }

    const gameLose = function () {
        battleWidthIncrease();
        result.classList.add('flipIn');
        decision.textContent = "you lose";
        cpu.classList.add('winner');
    }

    const gameDraw = function () {
        battleWidthIncrease();
        result.classList.add('flipIn');
        decision.textContent = "you draw";
    }

    const battleWidthIncrease = function () {
        if (window.outerWidth > 1000) {
            result.classList.add('sizeIncrease');
        }
    }

    const scoringSystem = function () {
        scoreValue = parseInt(score.textContent);

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
    }

    const newGame = function () {
        localStorage.setItem('score', '0');
        score.textContent = '0';
    }

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
        }, 500);
    }

    function loadEventListeners() {
        playBtn.addEventListener('click', startGame);
        rulesBtn.forEach(button => {
            button.addEventListener('click', openRulesModal);
        })
        closeRulesBtn.addEventListener('click', closeRulesModal);
        dropShadow.addEventListener('click', closeRulesModal);
        playerPick.forEach((pick, i) => {
            pick.addEventListener('click', function () {
                signSelected(pick, i);
            });
        });
        newGameBtn.addEventListener('click', newGame);
        newGameBtn.addEventListener('click', () => {
            const bCL = battle.classList;
            if (bCL.contains('compAnimation') || bCL.contains('slideInRight')) {
                playAgain();
            };
        });
        result.lastElementChild.addEventListener('click', playAgain);
    }

    loadEventListeners();
}

app();