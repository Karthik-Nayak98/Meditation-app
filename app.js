(function () {
  const STROKE_MAX_VALUE = 283,
    WARNING_COLOR = '#ffcc00',
    DANGER_COLOR = '#cc3300',
    NORMAL_COLOR = '#99cc33';

  const timeCounterContainer = document.querySelector(`.clock`),
    buttons = document.querySelector('.timer-buttons'),
    playPauseButton = document.querySelector('.player-container'),
    soundButtons = document.querySelector('.music-container'),
    rainSound = new Audio('./sound/rain.mp3'),
    beachSound = new Audio('./sound/sea-waves.mp3'),
    svgOuterCircle = document.querySelector('.outer-circle'),
    playButton = document.querySelector('.play-button'),
    pauseButton = document.querySelector('.pause-button');

  let totalTime,
    timeLeft,
    timePassed,
    timer = null,
    warningValue,
    dangerValue;
  timeCounterContainer.textContent = '00:00';

  // Getting the totalTime value
  buttons.addEventListener('click', function (e) {
    totalTime = Number(e.target.dataset.timer);
    timeLeft = totalTime;
    timePassed = 0;
    playButton.style.pointerEvents = 'initial';
    (warningValue = (totalTime * 50) / 100),
      (dangerValue = (totalTime * 10) / 100);
    counterDecrement();
    // timerAnimation();
  });

  playPauseButton.addEventListener('click', function (e) {
    let button = e.target.dataset.buttonvalue;

    if (button === 'play') {
      playButton.style.display = 'none';
      pauseButton.style.display = 'initial';
      starttotalTime();
    } else if (button === 'pause') {
      pauseButton.style.display = 'none';
      playButton.style.display = 'initial';
      clearInterval(timer);
    }
  });

  function changeColor() {
    if (timeLeft <= dangerValue) svgOuterCircle.style.stroke = DANGER_COLOR;
    else if (timeLeft <= warningValue)
      svgOuterCircle.style.stroke = WARNING_COLOR;
    else svgOuterCircle.style.stroke = NORMAL_COLOR;
  }
  function timerAnimation() {
    let fractionTime = timePassed / totalTime;
    // fractionTime = fractionTime - (1 / totalTime) * (1 + fractionTime);
    strokeDashValue = `${(fractionTime * STROKE_MAX_VALUE).toFixed(
      0
    )} ${STROKE_MAX_VALUE}`;
    console.log(strokeDashValue);
    svgOuterCircle.setAttribute('stroke-dasharray', strokeDashValue);

    changeColor();
  }

  function counterDecrement() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    timeCounterContainer.textContent = `${minutes}:${seconds}`;
  }

  function starttotalTime() {
    timer = setInterval(function () {
      timePassed += 1;
      timeLeft = totalTime - timePassed;
      counterDecrement();
      timerAnimation();
      if (timeLeft === 0) {
        clearInterval(timer);
        new Audio('./sound/bell.mp3').play();
        svgOuterCircle.setAttribute('stroke-dasharray', `283 283`);
        playButton.style.display = 'initial';
        pauseButton.style.display = 'none';
      }
    }, 1000);
  }

  soundButtons.addEventListener('click', function (e) {
    const musicButtonValue = e.target.dataset.value;

    console.log(musicButtonValue);
    if (musicButtonValue === 'beach') {
      beachSound.pause();
      beachSound.currentTime = 0;
      beachSound.playButton();
      if (!rainSound.paused) {
        rainSound.pause();
        rainSound.currentTime = 0;
      }
    } else if (musicButtonValue === 'rain') {
      rainSound.pause();
      rainSound.currentTime = 0;
      rainSound.playButton();
      if (!beachSound.paused) {
        beachSound.pause();
        beachSound.currentTime = 0;
      }
    }
  });
})();
