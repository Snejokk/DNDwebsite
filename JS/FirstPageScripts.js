function openNewPage1() {
      const square = document.getElementById('square');
  let bottomPosition = -100;
  let startTime;

  function easeInQuart(t) {
    return t*t*t*t;
  }

  function animateSquare(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const timeElapsed = currentTime - startTime;
    const duration = 1000;
    let progress = timeElapsed / duration;
    progress = Math.min(progress, 1);

    const easedProgress = easeInQuart(progress);

    bottomPosition = -115 + easedProgress * 100;

    square.style.bottom = bottomPosition + 'vh';

    if (progress < 1) {
      requestAnimationFrame(animateSquare);
    } else {
      square.style.bottom = '0';
      window.open("HTML/SecondPageGamePromt.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare);
}

function openNewPage2() {
      const square = document.getElementById('square');
  let bottomPosition = -100;
  let startTime;

  function easeInQuart(t) {
    return t*t*t*t;
  }

  function animateSquare(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const timeElapsed = currentTime - startTime;
    const duration = 1000;
    let progress = timeElapsed / duration;
    progress = Math.min(progress, 1);

    const easedProgress = easeInQuart(progress);

    bottomPosition = -115 + easedProgress * 100;

    square.style.bottom = bottomPosition + 'vh';

    if (progress < 1) {
      requestAnimationFrame(animateSquare);
    } else {
      square.style.bottom = '0';
      window.open("HTML/ThirdPage.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare);
}

function openNewPage3() {
      const square = document.getElementById('square');
  let bottomPosition = -100;
  let startTime;

  function easeInQuart(t) {
    return t*t*t*t;
  }

  function animateSquare(currentTime) {
    if (!startTime) {
      startTime = currentTime;
    }

    const timeElapsed = currentTime - startTime;
    const duration = 1000;
    let progress = timeElapsed / duration;
    progress = Math.min(progress, 1);

    const easedProgress = easeInQuart(progress);

    bottomPosition = -115 + easedProgress * 100;

    square.style.bottom = bottomPosition + 'vh';

    if (progress < 1) {
      requestAnimationFrame(animateSquare);
    } else {
      square.style.bottom = '0';
      window.open("HTML/FourPage.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare);
}

function Startt() {
    console.count('openNewPage вызвана');
    const square = document.getElementById('square2');
    if (!square) {
        console.error("Элемент с id 'square' не найден!");
        return;
    }

    let startTime;

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

        const easedProgress = easeOutQuart(progress);

        if (!startTime) {
            square.style.opacity = 1;
        }
        square.style.opacity = 1 - easedProgress * (1 - 0);

        if (progress < 1) {
            requestAnimationFrame(animateOpacity);
        } else {
        }
    }

    requestAnimationFrame(animateOpacity);
}

document.addEventListener('DOMContentLoaded', function() {
    Startt();
});