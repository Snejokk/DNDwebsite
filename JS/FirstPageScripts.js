function openNewPage1() {
      const square = document.getElementById('square');
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
      window.open("SecondPageGamePromt.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare); // Запускаем анимацию
}

function openNewPage2() {
      const square = document.getElementById('square');
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
      window.open("ThirdPage.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare); // Запускаем анимацию
}

function openNewPage3() {
      const square = document.getElementById('square');
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
      window.open("FourPage.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare); // Запускаем анимацию
}

function Startt() {
    console.count('openNewPage вызвана');
    const square = document.getElementById('square2');
    if (!square) {
        console.error("Элемент с id 'square' не найден!");
        return; // Выходим из функции, если элемент не найден
    }

    let startTime;

    // Функция easeOutQuart
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function animateOpacity(currentTime) {
        if (!startTime) {
            startTime = currentTime;
        }

        const timeElapsed = currentTime - startTime;
        const duration = 1900;
        let progress = timeElapsed / duration;
        progress = Math.min(progress, 1);

        // Используем easeOutQuart для плавного изменения прозрачности
        const easedProgress = easeOutQuart(progress);

        // Изменяем прозрачность элемента square. Анимация от 1 до 0.1
        // Изначально прозрачность должна быть 1
        if (!startTime) {
            square.style.opacity = 1; // Устанавливаем начальную прозрачность в 1
        }
        square.style.opacity = 1 - easedProgress * (1 - 0); // Анимация от 1 до 0.1

        if (progress < 1) {
            requestAnimationFrame(animateOpacity);
        } else {
            // Действия после завершения анимации прозрачности (например, открытие страницы)
            // window.open("SecondPageGamePromt.html", "_self");
        }
    }

    requestAnimationFrame(animateOpacity);
}

// Запускаем функцию openNewPage() после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    Startt();
});

