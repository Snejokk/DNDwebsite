document.addEventListener('DOMContentLoaded', () => {
    const difficultyButtons = document.querySelectorAll('.difficulty-button');

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const difficulty = button.dataset.difficulty;
            
            const urlParams = new URLSearchParams(window.location.search);
            const language = urlParams.get('language') || 'russian';

            window.location.href = `z-ChatPage.html?language=${language}&difficulty=${difficulty}`;
        });
    });
});