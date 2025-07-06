function Quit() {
      const square = document.getElementById('square2');
  let bottomPosition = -100;
  let startTime; // Время начала анимации

  // Функция easeInQuart (четвертичное замедление в начале)
  function easeInQuart(t) {
    return t*t*t*t;
  }

  function animateSquare(currentTime) {
    if (!startTime) {
      startTime = currentTime; // Запоминаем время начала
    }

    const timeElapsed = currentTime - startTime;
    const duration = 1000; // Общая продолжительность анимации в миллисекундах (настройте как нужно)
    let progress = timeElapsed / duration; // Прогресс анимации от 0 до 1
    progress = Math.min(progress, 1); // Убеждаемся, что progress не больше 1

    const easedProgress = easeInQuart(progress); // Применяем easeInQuart

    bottomPosition = -115 + easedProgress * 100; // Вычисляем позицию на основе easedProgress

    square.style.bottom = bottomPosition + 'vh';

    if (progress < 1) {
      requestAnimationFrame(animateSquare);
    } else {
      square.style.bottom = '0'; // Убеждаемся, что квадрат точно вверху
      window.open("FirstPage.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare); // Запускаем анимацию
}

