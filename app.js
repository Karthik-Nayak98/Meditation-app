const clock = document.querySelector(`.clock`);
const buttons = document.querySelector('.button-container');

let timer;
clock.textContent = '00:00';

// Adding events to buttons using event bubbling
buttons.addEventListener('click', function (e) {
  timer = e.target.dataset.timer;
  startTimer();
});

function startTimer() {
  let time = setInterval(function () {
    minute = Math.floor(timer / 60);
    seconds = timer % 60;

    if (String(minute).length == 1) {
      minute = `0` + String(minute);
    }
    if (String(seconds).length == 1) {
      seconds = `0` + String(seconds);
    }

    clock.textContent = `${minute}:${seconds}`;
    if (timer === 0) {
      clearInterval(time);
    }
    timer -= 1;
  }, 1000);
}
