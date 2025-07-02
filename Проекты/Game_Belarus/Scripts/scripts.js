 // --- БАЗА ВОПРОСОВ ---
        // Вы можете легко добавить сюда свои вопросы
        // 'correct' - это индекс правильного ответа (начиная с 0)
        const questions = [
            {
                question: "Столица Республики Беларусь?",
                answers: ["Гомель", "Минск", "Витебск", "Брест"],
                correct: 1
            },
            {
                question: "Какой национальный парк Беларуси называют 'легкими Европы'?",
                answers: ["Нарочанский", "Припятский", "Браславские озера", "Беловежская пуща"],
                correct: 3
            },
            {
                question: "Какое животное является символом Беларуси и изображено на эмблеме Беловежской пущи?",
                answers: ["Зубр", "Лось", "Аист", "Волк"],
                correct: 0
            },
            {
                question: "В каком городе находится знаменитая Брестская крепость-герой?",
                answers: ["Гродно", "Минск", "Брест", "Могилёв"],
                correct: 2
            },
            {
                question: "Назовите самый древний город Беларуси.",
                answers: ["Минск", "Полоцк", "Туров", "Заславль"],
                correct: 1
            },
            {
                question: "Какой знаменитый художник, родившийся в Витебске, известен своими работами в стиле авангардизма?",
                answers: ["Иван Шишкин", "Казимир Малевич", "Марк Шагал", "Илья Репин"],
                correct: 2
            },
            {
                question: "Как называется самая большая река, протекающая по территории Беларуси?",
                answers: ["Днепр", "Неман", "Припять", "Западная Двина"],
                correct: 0
            },
            {
                question: "Какой традиционный белорусский драник является основным блюдом?",
                answers: ["Картофельные оладьи", "Борщ", "Пельмени", "Хачапури"],
                correct: 0
            }
        ];

        // --- DOM ЭЛЕМЕНТЫ ---
        const gameBoard = document.getElementById('game-board');
        const diceElement = document.getElementById('dice');
        const turnDisplay = document.getElementById('turn-display');
        const questionContainer = document.getElementById('question-container');
        const answersContainer = document.getElementById('answers-container');
        const player1Element = document.getElementById('player1');
        const player2Element = document.getElementById('player2');
        const winnerPopup = document.getElementById('winner-popup');
        const winnerMessage = document.getElementById('winner-message');

        // --- ИГРОВОЕ СОСТОЯНИЕ ---
        const totalSteps = 70;
        let currentPlayer = 1;
        let playerPositions = { 1: 0, 2: 0 };
        let gameActive = true;
        let currentDiceRoll = 0;
        let currentQuestion = null;


        // --- ИНИЦИАЛИЗАЦИЯ ИГРЫ ---
        function initGame() {
            // Создаем клетки на поле
            for (let i = 1; i <= totalSteps; i++) {
                const step = document.createElement('div');
                step.classList.add('step');
                step.id = `step-${i}`;
                step.textContent = i;
                if (i === 1) step.classList.add('start');
                if (i === totalSteps) step.classList.add('finish');
                gameBoard.appendChild(step);
            }
            updatePlayerPositions();
            resetQASection();
        }

        // --- ОБНОВЛЕНИЕ ПОЗИЦИЙ ФИШЕК ---
        function updatePlayerPositions() {
            // Позиция Игрока 1
            const pos1 = playerPositions[1];
            const targetStep1 = document.getElementById(pos1 === 0 ? 'step-1' : `step-${pos1}`);
            if (targetStep1) {
                player1Element.style.top = `${targetStep1.offsetTop}px`;
                player1Element.style.left = `${targetStep1.offsetLeft}px`;
            }
             // Позиция Игрока 2
            const pos2 = playerPositions[2];
            const targetStep2 = document.getElementById(pos2 === 0 ? 'step-1' : `step-${pos2}`);
             if (targetStep2) {
                player2Element.style.top = `${targetStep2.offsetTop}px`;
                player2Element.style.left = `${targetStep2.offsetLeft}px`;
            }
        }
        
        // --- СБРОС СЕКЦИИ ВОПРОСОВ И ОТВЕТОВ ---
        function resetQASection(message = "Нажмите на кубик...") {
            questionContainer.textContent = message;
            answersContainer.innerHTML = '';
        }

        // --- БРОСОК КУБИКА ---
        function rollDice() {
            if (!gameActive || currentDiceRoll !== 0) return; // Нельзя бросать, пока не ответили на вопрос

            currentDiceRoll = Math.floor(Math.random() * 6) + 1;
            diceElement.textContent = currentDiceRoll;
            diceElement.classList.add('disabled');

            displayQuestion();
        }

        // --- ПОКАЗАТЬ ВОПРОС ---
        function displayQuestion() {
            // Выбираем случайный вопрос
            const questionIndex = Math.floor(Math.random() * questions.length);
            currentQuestion = questions[questionIndex];

            questionContainer.textContent = currentQuestion.question;
            answersContainer.innerHTML = ''; // Очищаем предыдущие ответы

            // Создаем карточки ответов
            currentQuestion.answers.forEach((answer, index) => {
                const card = document.createElement('div');
                card.classList.add('answer-card');
                card.textContent = answer;
                card.dataset.index = index;
                card.addEventListener('click', checkAnswer);
                answersContainer.appendChild(card);
            });
        }

        // --- ПРОВЕРКА ОТВЕТА ---
        function checkAnswer(event) {
            if (!gameActive) return;
            const selectedIndex = parseInt(event.target.dataset.index);
            const allCards = document.querySelectorAll('.answer-card');
            allCards.forEach(card => card.classList.add('disabled')); // Блокируем все карточки

            if (selectedIndex === currentQuestion.correct) {
                // Правильный ответ
                event.target.style.backgroundColor = '#90EE90'; // Зеленый
                event.target.style.color = 'black';
                questionContainer.textContent = `Верно! Перемещаемся на ${currentDiceRoll} клеток.`;
                movePlayer();
            } else {
                // Неправильный ответ
                event.target.style.backgroundColor = '#FFB6C1'; // Светло-красный
                event.target.style.color = 'black';
                // Показываем правильный ответ
                allCards[currentQuestion.correct].style.backgroundColor = '#90EE90';
                questionContainer.textContent = `Неверно! Ход переходит к другому игроку.`;
                setTimeout(switchPlayer, 2000); // Задержка перед сменой игрока
            }
        }

        // --- ПЕРЕМЕЩЕНИЕ ИГРОКА ---
        function movePlayer() {
            playerPositions[currentPlayer] += currentDiceRoll;
            
            // Проверка на победу
            if (playerPositions[currentPlayer] >= totalSteps) {
                playerPositions[currentPlayer] = totalSteps;
                endGame();
            }
            
            updatePlayerPositions();
            setTimeout(switchPlayer, 1500); // Задержка перед сменой игрока
        }

        // --- СМЕНА ИГРОКА ---
        function switchPlayer() {
            if (!gameActive) return;

            currentPlayer = (currentPlayer === 1) ? 2 : 1;
            turnDisplay.textContent = `Игрок ${currentPlayer}`;
            turnDisplay.style.color = (currentPlayer === 1) ? '#1E90FF' : '#DAA520';

            currentDiceRoll = 0;
            currentQuestion = null;
            diceElement.textContent = '?';
            diceElement.classList.remove('disabled');
            resetQASection(`Ход Игрока ${currentPlayer}. Бросайте кубик!`);
        }

        // --- КОНЕЦ ИГРЫ ---
        function endGame() {
            gameActive = false;
            winnerMessage.textContent = `Игрок ${currentPlayer} победил!`;
            winnerPopup.classList.add('show');
            diceElement.classList.add('disabled');
        }

        // --- ОБРАБОТЧИКИ СОБЫТИЙ ---
        diceElement.addEventListener('click', rollDice);
        window.addEventListener('resize', updatePlayerPositions); // Обновляем позиции при изменении размера окна

        // --- ЗАПУСК ИГРЫ ---
        initGame();
