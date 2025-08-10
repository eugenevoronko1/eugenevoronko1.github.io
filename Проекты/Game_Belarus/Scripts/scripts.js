document.addEventListener('DOMContentLoaded', () => {

    // --- Вопросы ---
    const allQuestions = [
        { image: "https://upload.wikimedia.org/wikipedia/commons/1/1d/BelAZ-75710_in_Bachatsky_coal_mine.jpg", question: "Назавіце горад у Мінскай вобласці, дзе выпускаюцца самыя вялізныя ў свеце кар'ерныя самазвалы?", answers: ["Барысаў", "Жодзіна", "Заслаўе", "Салігорск"], correct: 1 },
        { image: "https://www.belneftekhim.by/upload/iblock/c38/c38865b38d320914a858c62c262175d7.jpg", question: "У якіх беларускіх гарадах знаходзяцца нафтаперапрацоўчыя прадпрыемствы?", answers: ["Мазыр і Наваполацк", "Салігорск і Віцебск", "Гмель і Бабруйск", "Магілёў і Мінск"], correct: 0 },
        { image: "https://planetabelarus.by/upload/resize_cache/iblock/8fc/1330_887_18e21fe611a58abe165a38622b3b680e5/8fc3a681813e48135a5077271e54948a.jpg", question: "Дзякаючы дзейнасці якога прадпрыемства ў Мінскай вобласці з'явіліся чырвона-бурыя горы?", answers: ["БелДжы", "МТЗ", "Беларуськалій", "Нафтан"], correct: 2 },
        { image: "https://sputnik.by/storage/images/18/76/187635_0.jpg", question: "Якое прамысловае прадпрыемства распрацоўвае пад Мікашэвічамі самы буйны гранітны кар'ер?", answers: ["БелАЗ", "МАЗ", "Гомсельмаш", "Граніт"], correct: 3 },
        { image: "https://www.gomselmash.by/upload/iblock/a99/a994770e5a9c513257f5251859b9148d.jpg", question: "Якую прадукцыю выпускаюць на гомельскім прадпрыемстве «Гомсельмаш»?", answers: ["камбайны", "гадзіннікі", "цукеркі", "моднае адзенне"], correct: 0 },
        { image: "https://cdn.iz.ru/sites/default/files/styles/980x556/public/news-2021-04/20210426_gaf_u3_354.jpg?itok=fU3LgWd-", question: "На якім прадпрыемстве выпускаюць беларускія аўтамабілі-пазадарожнікі?", answers: ["Лада", "БелДжы", "Нафтан", "Савушкін прадукт"], correct: 1 },
        { image: "https://cdn.belaruspartisan.org/images/2019/May/22/1558514580_2_photo-16279.jpg", question: "Які беларускі завод выпускае больш за ўсё грузавікоў?", answers: ["Спартак", "МАЗ", "МотаВелаЗавод", "БАТЭ"], correct: 1 },
        { image: "https://infotrans.by/wp-content/uploads/2021/01/maz-203965-1.jpg", question: "Якія віды транспартных сродкаў выпускаюць на беларускіх прадпрыемствах МАЗ (Мінск), Нёман (Ліда) і БКМ Холдынг (Мінск)?", answers: ["аўтобусы", "самалёты", "верталёты", "цягнікі"], correct: 0 },
        { image: "https://atlant.by/upload/medialibrary/17f/17f16c276f578b7b7501a302a5c48858.jpg", question: "Што выпускаюць на мінскім прадпрыемстве «Атлант»?", answers: ["халадзільнікі і пральныя машыны", "трактары і камбайны", "гадзіннікі і радыёпрыёмнікі", "абутак і адзенне"], correct: 0 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Belavia_Boeing_737-800_EW-455PA_at_Frankfurt_Airport.jpg/1280px-Belavia_Boeing_737-800_EW-455PA_at_Frankfurt_Airport.jpg", question: "Назавіце беларускую кампанію, якая займаецца міжнароднымі пасажырскімі авіяперавозкамі?", answers: ["БелАЗ", "Магілёўліфтмаш", "Белавія", "БелДжы"], correct: 2 },
        { image: "https://agriculture.by/image/catalog/news_img/MTZ/2021/bespilotnik-mtz-poluchil-zolotuyu-medal-agr.jpeg", question: "На якім прадпрыемстве выпускаюць беспілотны трактар «BELARUS A3523i»?", answers: ["МТЗ", "Атлант", "Гарызонт", "Керамін"], correct: 0 },
        { image: "https://metropoliten.by/upload/medialibrary/b00/b00e6205a2e5d9573855325888a7c1e5.jpg", question: "Дзе знаходзіцца адзіны метрапалітэн у Беларусі?", answers: ["Гомель", "Брэст", "Мінск", "Віцебск"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Belarusian_nuclear_power_plant._%C5%81ukašy.jpg", question: "У якім годзе ўведзены ў эксплуатацыю першы энергаблок Беларускай атамнай электрастанцыі?", answers: ["1980", "1990", "2000", "2020"], correct: 3 },
        { image: "https://belsteel.com/img/news/2020/2-2.jpg", question: "Назавіце завод у горадзе Жлобіне, які з'яўляецца адным з найбуйнейшых вытворцаў металапрадукцыі ў СНД?", answers: ["МАЗ", "МТЗ", "БМЗ", "БелАЗ"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Belshina_tyre.JPG/1024px-Belshina_tyre.JPG", question: "Гэтае прадпрыемства з'яўляецца адным з найбуйнейшых вытворцаў у шыннай галіне ў СНД. Назавіце яго?", answers: ["Шпаркі дамавік", "БелАЗ", "Белшына", "БКМ Холдынг"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Kommunarka_candy_shop_in_Minsk_3.jpg", question: "Салодкую прадукцыю гэтых кандытарскіх кампаній беларусы штогод атрымліваюць у навагодніх падарунках. Назавіце іх?", answers: ["«Марс» і «Снікерс»", "«Беларуськалій» і МАЗ", "«Гомсельмаш» і МТЗ", "«Камунарка» і «Спартак»"], correct: 3 },
        { image: "https://savushkin.by/upload/iblock/c32/c32603f2e461c36b6354d24177264858.jpg", question: "Назавіце прадпрыемства, якое з'яўляецца адным з лідараў сярод краін СНД па малочнай прадукцыі?", answers: ["Камунарка", "Мілківэй", "Савушкін прадукт", "Інтэграл"], correct: 2 },
        { image: "https://keramin.by/upload/iblock/884/8845e22709214cf4c05b871c8282e75e.jpg", question: "Назавіце вядомага ў Беларусі і краінах Усходняй Еўропы вытворцу керамічнай прадукцыі?", answers: ["Бабушкіна крынка", "Спартак", "БМЗ", "Керамін"], correct: 3 },
        { image: "https://photobelta.by/images/photos/00020000000001000570/000000000060935_preview.jpg", question: "Гэтае прадпрыемства ўваходзіць у васьмёрку сусветна вядомых вытворцаў сельскагаспадарчай тэхнікі?", answers: ["МТЗ", "МАЗ", "Савушкін прадукт", "Бабушкіна крынка"], correct: 0 },
        { image: "https://www.sb.by/upload/medialibrary/a79/a79a613264b3864b9a52d3a339f40e0c.jpg", question: "Назавіце адзін з вядучых цэнтраў развіцця IT і распрацоўкі праграмных прыкладанняў у Еўропе?", answers: ["Гефест", "Адукацыя і выхаванне", "Парк высокіх тэхналогій", "Белтрансгаз"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Orsha_Linen_Mill.JPG", question: "Назавіце адзінае ў Беларусі і адно з найбуйнейшых у Еўропе прадпрыемства па вытворчасці льняных тканін?", answers: ["Мілавіца", "Марка", "Алеся", "Аршанскі льнокамбінат"], correct: 3 },
        { image: "https://milavitsa.com/upload/resize_cache/iblock/d76/650_10000_1/d760b29ce37f8f6ea49a622638e4a9e5.jpg", question: "Які вы ведаеце знакаміты на ўвесь свет беларускі брэнд жаночай бялізны?", answers: ["Белвест", "Шагавіта", "Мілавіца", "Прамень"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Luch_watch.jpg/1280px-Luch_watch.jpg", question: "На выпуску якога віду прадукцыі спецыялізуецца завод «Луч»?", answers: ["тэлевізары", "мабільныя тэлефоны", "гадзіннікі", "харчаванне"], correct: 2 },
        { image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/FC_BATE_Borisov_team_2012.jpg", question: "Як называецца барысаўскі завод, на якім была заснавана знакамітая футбольная каманда - 15-разовы чэмпіён Беларусі?", answers: ["Шахцёр", "Тарпеда", "Дынама", "БАТЭ"], correct: 3 },
        { image: "https://horizont-group.com/assets/components/phpthumbof/cache/tv-ultrahd.3685608d0b2f02476b7e0965d0a646c0.png", question: "Якую прадукцыю выпускаюць беларускія прадпрыемствы «Віцязь» і «Гарызонт»?", answers: ["абутак", "самазвалы", "трактары", "тэлевізары"], correct: 3 },
    ];
    let availableQuestions = [];

    // --- DOM ЭЛЕМЕНТЫ ---
    const gameBoard = document.getElementById('game-board');
    const diceElement = document.getElementById('dice');
    const turnDisplay = document.getElementById('turn-display');
    const statusContainer = document.getElementById('status-container');
    const player1Element = document.getElementById('player1');
    const player2Element = document.getElementById('player2');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerMessage = document.getElementById('winner-message');
    const cellPopup = document.getElementById('cell-popup');
    const cellImage = document.getElementById('cell-image');
    const cellQuestion = document.getElementById('cell-question');
    const cellAnswers = document.getElementById('cell-answers');
    const colorSelectionPopup = document.getElementById('color-selection-popup');
    const player1ColorChoices = document.getElementById('player1-color-choices');
    const player2ColorChoices = document.getElementById('player2-color-choices');
    const startGameBtn = document.getElementById('start-game-btn');
    const restartGameBtn = document.getElementById('restart-game-btn');

    // --- ИГРОВОЕ СОСТОЯНИЕ ---
    const totalSteps = 70;
    let currentPlayer = 1;
    let playerPositions = { 1: 0, 2: 0 };
    let gameActive = false;
    let currentDiceRoll = 0;
    let currentQuestionData = null;

    /**
     * Генерирует массив из n-го количества цветов в формате HSL.
     * @param {number} count - Количество цветов для генерации.
     * @returns {string[]} Массив цветов.
     */
    function generateHslColors(count) {
        const colors = [];
        const saturation = 75;
        const lightness = 60;
        const hueStep = 360 / count;

        for (let i = 0; i < count; i++) {
            const hue = Math.round(i * hueStep);
            colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
        }
        return colors;
    }

    const availableColors = generateHslColors(36);
    let playerColors = { 1: null, 2: null };

    // --- ЛОГИКА ВЫБОРА ЦВЕТА ---
    function createColorSwatches() {
        availableColors.forEach(color => {
            [player1ColorChoices, player2ColorChoices].forEach((container, playerIndex) => {
                const swatch = document.createElement('div');
                swatch.classList.add('color-swatch');
                swatch.style.backgroundColor = color;
                swatch.dataset.color = color;
                swatch.dataset.player = playerIndex + 1;
                swatch.addEventListener('click', selectColor);
                container.appendChild(swatch);
            });
        });
    }

    function selectColor(event) {
        const selectedColor = event.target.dataset.color;
        const playerNum = parseInt(event.target.dataset.player);
        const otherPlayerNum = playerNum === 1 ? 2 : 1;

        if (selectedColor === playerColors[otherPlayerNum]) return;
        
        playerColors[playerNum] = selectedColor;

        const currentPlayerSwatches = document.querySelectorAll(`#player${playerNum}-color-choices .color-swatch`);
        currentPlayerSwatches.forEach(s => {
            s.classList.toggle('selected', s.dataset.color === selectedColor);
        });

        const otherPlayerSwatches = document.querySelectorAll(`#player${otherPlayerNum}-color-choices .color-swatch`);
        otherPlayerSwatches.forEach(s => {
            s.classList.toggle('disabled', s.dataset.color === playerColors[1] || s.dataset.color === playerColors[2]);
        });
        
        if (playerColors[1] && playerColors[2]) {
            startGameBtn.classList.remove('disabled');
            startGameBtn.disabled = false;
        }
    }

    function setupInitialScreen() {
        createColorSwatches();
        startGameBtn.addEventListener('click', () => {
            colorSelectionPopup.style.display = 'none';
            gameActive = true;
            initGame();
        });
        restartGameBtn.addEventListener('click', () => {
            if (confirm('Вы уверены, что хотите начать игру заново?')) {
                location.reload();
            }
        });
    }

    // --- ИНИЦИАЛИЗАЦИЯ ИГРЫ ---
    function initGame() {
        player1Element.style.backgroundColor = playerColors[1];
        player2Element.style.backgroundColor = playerColors[2];
        turnDisplay.style.color = playerColors[1];

        availableQuestions = [...allQuestions].sort(() => 0.5 - Math.random());

        for (let i = 1; i <= totalSteps; i++) {
            const step = document.createElement('div');
            step.classList.add('step');
            if (i % 7 === 0 && i !== totalSteps) step.classList.add('special');
            step.id = `step-${i}`;
            step.textContent = i;
            if (i === 1) step.classList.add('start');
            if (i === totalSteps) step.classList.add('finish');
            gameBoard.appendChild(step);
        }
        updatePlayerPositions();
        updateStatusMessage(`Ход Игрока ${currentPlayer}. Бросайте кубик!`);
    }

    // --- БРОСОК КУБИКА ---
    function rollDice() {
        if (!gameActive || diceElement.classList.contains('disabled')) return;

        currentDiceRoll = Math.floor(Math.random() * 6) + 1;
        diceElement.textContent = currentDiceRoll;
        diceElement.classList.add('disabled');
        
        if (availableQuestions.length > 0) {
            currentQuestionData = availableQuestions.pop(); 
            updateStatusMessage(`Ответьте на вопрос, чтобы сделать ход.`);
            setTimeout(() => showCellPopup(currentQuestionData), 500);
        } else {
            updateStatusMessage(`Вопросы закончились! Просто идем вперед.`);
            movePlayer();
        }
    }

    // --- ПОКАЗ ОКНА С ВОПРОСОМ ---
    function showCellPopup(data) {
        cellImage.src = data.image ? data.image : "";
        cellImage.style.display = data.image ? 'block' : 'none';
        cellQuestion.textContent = data.question;
        cellAnswers.innerHTML = '';
        data.answers.forEach((answer, index) => {
            const btn = document.createElement('button');
            btn.classList.add('cell-answer-btn');
            btn.textContent = answer;
            btn.dataset.index = index;
            btn.addEventListener('click', checkCellAnswer);
            cellAnswers.appendChild(btn);
        });
        cellPopup.classList.add('show');
    }
    
    // --- ОСНОВНАЯ ИГРОВАЯ ЛОГИКА ---
    function updatePlayerPositions() {
        [1, 2].forEach(playerNum => {
            const pos = playerPositions[playerNum];
            const playerElement = (playerNum === 1) ? player1Element : player2Element;
            const targetStep = document.getElementById(pos === 0 ? 'step-1' : `step-${pos}`);
            
            if (targetStep) {
                const playerOffset = (playerNum === 1) ? -7 : 7;
                playerElement.style.top = `${targetStep.offsetTop + targetStep.offsetHeight / 2 - playerElement.offsetHeight / 2}px`;
                playerElement.style.left = `${targetStep.offsetLeft + targetStep.offsetWidth / 2 - playerElement.offsetWidth / 2 + playerOffset}px`;
            }
        });
    }
    
    function updateStatusMessage(message) {
        statusContainer.textContent = message;
    }

    function checkCellAnswer(event) {
        if (!gameActive) return;
        const selectedIndex = parseInt(event.target.dataset.index);
        const allBtns = document.querySelectorAll('.cell-answer-btn');
        allBtns.forEach(btn => btn.classList.add('disabled'));
        
        if (selectedIndex === currentQuestionData.correct) {
            event.target.style.backgroundColor = 'var(--primary)';
            event.target.style.color = 'var(--on-primary)';
            updateStatusMessage(`Верно! Перемещаемся на ${currentDiceRoll} клеток.`);
            setTimeout(() => {
                cellPopup.classList.remove('show');
                movePlayer();
            }, 1500);
        } else {
            event.target.style.backgroundColor = 'var(--error)';
            event.target.style.color = 'var(--on-error)';
            allBtns[currentQuestionData.correct].style.backgroundColor = 'var(--primary)';
            allBtns[currentQuestionData.correct].style.color = 'var(--on-primary)';
            updateStatusMessage(`Неверно! Вы остаетесь на месте. Ход переходит.`);
            setTimeout(() => {
                cellPopup.classList.remove('show');
                switchPlayer();
            }, 2000);
        }
    }

    function movePlayer() {
        playerPositions[currentPlayer] += currentDiceRoll;
        if (playerPositions[currentPlayer] >= totalSteps) {
            playerPositions[currentPlayer] = totalSteps;
            updatePlayerPositions();
            endGame();
            return;
        }
        updatePlayerPositions();
        setTimeout(switchPlayer, 800);
    }

    function switchPlayer() {
        if (!gameActive) return;
        currentPlayer = (currentPlayer === 1) ? 2 : 1;
        turnDisplay.textContent = `Игрок ${currentPlayer}`;
        turnDisplay.style.color = playerColors[currentPlayer];
        currentDiceRoll = 0;
        currentQuestionData = null;
        diceElement.textContent = '?';
        diceElement.classList.remove('disabled');
        updateStatusMessage(`Ход Игрока ${currentPlayer}. Бросайте кубик!`);
    }

    function endGame() {
        gameActive = false;
        winnerMessage.textContent = `Игрок ${currentPlayer} победил! Поздравляем!`;
        winnerMessage.style.color = playerColors[currentPlayer]; 
        winnerPopup.classList.add('show');
        diceElement.classList.add('disabled');
    }

    diceElement.addEventListener('click', rollDice);
    window.addEventListener('resize', updatePlayerPositions);

    // --- ЗАПУСК НАЧАЛЬНОГО ЭКРАНА ---
    setupInitialScreen();
});