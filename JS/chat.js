function openNewPage() {
    console.count('openNewPage вызвана');
    const square = document.getElementById('square');
    if (!square) {
        console.error("Элемент с id 'square' не найден!");
        return; 
    }

    let startTime;

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

        const easedProgress = easeOutQuart(progress);

        bottomPosition = -2 + easedProgress * 114;

        square.style.bottom = bottomPosition + 'vh';

        if (progress < 1) {
            requestAnimationFrame(animateSquare);
        } else {
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
    let messageHistory = []; 

    const urlParams = new URLSearchParams(window.location.search);
    const urlLanguage = urlParams.get('language');
    const urlDifficulty = urlParams.get('difficulty');

    if (urlLanguage) {
        currentLanguage = urlLanguage;
    }
    if (urlDifficulty) {
        currentDifficulty = urlDifficulty;
    }

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
            infoDiv.className = 'message-info'; 
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
                infoSpan.className = 'language-info'; 
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

        if (message) {
            addMessage(message, true, null, null, false); 
        }
        chatInput.value = '';

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'message ai-message loading';
        loadingDiv.textContent = 'AI думает...';
        chatDisplay.appendChild(loadingDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        try {
            const payload = {
                message: message,
                language: selectedLanguage,
                difficulty: currentDifficulty,
                history: messageHistory 
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
                addMessage(data.response, false, data.language, data.difficulty, false); 

                if (message) { 
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
        currentLanguage = selectedLanguage; 
        messageHistory = []; 
        chatDisplay.innerHTML = ''; 
        const languageName = getLanguageDisplayName(selectedLanguage);
        addMessage(`Язык изменен на: ${languageName}`, false, selectedLanguage, currentDifficulty, false); 
        
        if (urlDifficulty) {
            sendMessage();
        }
    });

    loadAvailableLanguages().then(() => {
        if (urlDifficulty) {
            sendMessage(); 
        } else {
            addMessage("AI готов к работе! Выберите язык ответа в выпадающем списке.", false, currentLanguage, null, false); 
        }
    });

});


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


window.addEventListener('load', () => {
    const inputElement = document.getElementById('chat-input');
    if (inputElement) {
        typeWriterEffect(inputElement, "Напишите ваше сообщение здесь...", 50); 
    }
});