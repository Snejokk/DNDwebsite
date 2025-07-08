function Quit() {
      const square = document.getElementById('square2');
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
      window.open("../index.html", "_self");
    }
  }

  requestAnimationFrame(animateSquare);
}
