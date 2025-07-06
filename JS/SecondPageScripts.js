document.addEventListener('DOMContentLoaded', () => {
    const difficultyButtons = document.querySelectorAll('.difficulty-button');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const difficulty = button.dataset.difficulty;
            
            // Получаем язык из URL, если он есть
            const urlParams = new URLSearchParams(window.location.search);
            const language = urlParams.get('language') || 'russian'; // По умолчанию русский

            // Перенаправляем на страницу чата с выбранной сложностью и языком
            window.location.href = `../HTML/z-ChatPage.html?language=${language}&difficulty=${difficulty}`;
        });
    });
}); 