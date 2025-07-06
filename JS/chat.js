function openNewPage() {
    console.count('openNewPage вызвана');
    const square = document.getElementById('square');
    if (!square) {
        console.error("Элемент с id 'square' не найден!");
        return; // Выходим из функции, если элемент не найден
    }

    let startTime;

    // Функция easeOutQuart
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateSquare(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const duration = 900;
        let progress = timeElapsed / duration;
        progress = Math.min(progress, 1);

        // Используем easeOutQuart вместо easeInQuart
        const easedProgress = easeOutQuart(progress);

        bottomPosition = -2 + easedProgress * 114;

        square.style.bottom = bottomPosition + 'vh';

        if (progress < 1) {
            requestAnimationFrame(animateSquare);
        } else {
            //window.open("SecondPageGamePromt.html", "_self");
        }
    }

    requestAnimationFrame(animateSquare);
}

document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chat-display');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const languageSelector = document.getElementById('chat-language');

    let currentLanguage = 'russian';
    let currentDifficulty = 'Normal';
    let messageHistory = []; // Массив для хранения истории сообщений

    // Получаем параметры языка и сложности из URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlLanguage = urlParams.get('language');
    const urlDifficulty = urlParams.get('difficulty');

    if (urlLanguage) {
        currentLanguage = urlLanguage;
    }
    if (urlDifficulty) {
        currentDifficulty = urlDifficulty;
    }

    // Загружаем доступные языки с сервера
    async function loadAvailableLanguages() {
        try {
            const response = await fetch('http://localhost:5000/api/languages');
            const data = await response.json();
            
            if (response.ok) {
                languageSelector.innerHTML = '';
                data.languages.forEach(language => {
                    const option = document.createElement('option');
                    option.value = language.id;
                    option.textContent = `${language.flag} ${language.name}`;
                    option.title = language.description;
                    languageSelector.appendChild(option);
                });
                // Устанавливаем выбранный язык из URL или по умолчанию
                languageSelector.value = currentLanguage;
                console.log('Языки загружены:', data.languages);
            } else {
                console.error('Ошибка загрузки языков:', data.error);
            }
        } catch (error) {
            console.error('Ошибка соединения при загрузке языков:', error);
        }
    }

    function addMessage(message, isUser = false, language = null, difficulty = null, addToHistory = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        if (!isUser) {
            const infoDiv = document.createElement('div');
            infoDiv.className = 'message-info'; // Новый класс для общей информации
            let infoText = '';

            if (language) {
                infoText += `Язык: ${getLanguageDisplayName(language)}`;
            }
            if (difficulty) {
                if (infoText) infoText += ' | ';
                infoText += `Сложность: ${difficulty}`;
            }
            if (infoText) {
                const infoSpan = document.createElement('span');
                infoSpan.className = 'language-info'; // Переименовал в language-info
                infoSpan.textContent = infoText;
                infoDiv.appendChild(infoSpan);
            }
            messageDiv.appendChild(infoDiv);
        }
        
        const messageText = document.createElement('div');
        messageText.className = 'message-text';
        messageText.textContent = message;
        messageDiv.appendChild(messageText);
        
        chatDisplay.appendChild(messageDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        // Добавляем сообщение в историю
        if (addToHistory) {
            messageHistory.push({
                role: isUser ? 'user' : 'model',
                parts: [{ text: message }]
            });
        }
    }

    function getLanguageDisplayName(language) {
        const selectedOption = languageSelector.querySelector(`option[value="${language}"]`);
        return selectedOption ? selectedOption.textContent : language;
    }

    async function sendMessage() {
        const message = chatInput.value.trim();
        
        const isInitialDmRequest = message === '' && currentDifficulty !== 'Normal' && messageHistory.length === 0;
        
        if (!message && !isInitialDmRequest) return;

        const selectedLanguage = languageSelector.value;
        currentLanguage = selectedLanguage;

        // Отображаем сообщение пользователя немедленно, но НЕ добавляем в историю пока
        if (message) {
            addMessage(message, true, null, null, false); // addToHistory = false
        }
        chatInput.value = '';

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading';
        loadingDiv.textContent = 'AI думает...';
        chatDisplay.appendChild(loadingDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        try {
            // История, отправляемая на бэкенд, НЕ должна содержать текущее сообщение пользователя.
            // Текущее сообщение пользователя отправляется в поле 'message'.
            const payload = {
                message: message,
                language: selectedLanguage,
                difficulty: currentDifficulty,
                history: messageHistory // messageHistory содержит только *предыдущие* ходы
            };

            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            
            chatDisplay.removeChild(loadingDiv);
            
            if (response.ok) {
                // Отображаем ответ AI
                addMessage(data.response, false, data.language, data.difficulty, false); // addToHistory = false и здесь

                // Теперь добавляем и сообщение пользователя, и ответ AI в messageHistory
                // Это гарантирует, что messageHistory всегда отражает завершенные ходы для следующего взаимодействия
                if (message) { // Добавляем сообщение пользователя только если оно не было пустым (например, не начальный запрос DM)
                    messageHistory.push({
                        role: 'user',
                        parts: [{ text: message }]
                    });
                }
                messageHistory.push({
                    role: 'model',
                    parts: [{ text: data.response }]
                });

            } else {
                addMessage('Ошибка: ' + (data.error || 'Не удалось получить ответ'));
            }
        } catch (error) {
            chatDisplay.removeChild(loadingDiv);
            addMessage('Ошибка соединения с сервером');
            console.error('Error:', error);
        }
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    languageSelector.addEventListener('change', () => {
        const selectedLanguage = languageSelector.value;
        currentLanguage = selectedLanguage; // Обновляем текущий язык при изменении в селекторе
        messageHistory = []; // Очищаем историю при смене языка
        chatDisplay.innerHTML = ''; // Очищаем дисплей чата
        const languageName = getLanguageDisplayName(selectedLanguage);
        addMessage(`Язык изменен на: ${languageName}`, false, selectedLanguage, currentDifficulty, false); // Не добавляем это сообщение в историю
        
        // Если мы в режиме D&D (определяется по наличию difficulty в URL), отправляем новый начальный запрос DM
        if (urlDifficulty) {
            sendMessage();
        }
    });

    // Загружаем языки при загрузке страницы
    loadAvailableLanguages().then(() => {
        // Отправляем первый запрос для D&D игры, если есть параметр сложности
        if (urlDifficulty) {
            sendMessage(); // Отправляем пустое сообщение, чтобы получить стартовый промпт от DM
        } else {
            // Если это обычный чат, показываем стандартное приветствие
            addMessage("AI готов к работе! Выберите язык ответа в выпадающем списке.", false, currentLanguage, null, false); // Не добавляем в историю
        }
    });

});

// Function to simulate typing text
function typeWriterEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.value += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add this call within the load event or wherever appropriate after the page is ready
window.addEventListener('load', () => {
    // Start the typing animation in the input field
    const inputElement = document.getElementById('chat-input');
    if (inputElement) {
        typeWriterEffect(inputElement, "Напишите ваше сообщение здесь...", 50); // Type "Write your message here..." with 50ms delay per character
    }
}); 