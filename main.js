let timerValue = 10;
let interval;
// запущен ли таймер уже
let isStarted = false;

//клик в любом месте запускает таймер
$("#wrapper").click(() => {
  if (timerValue && !isStarted) {
    interval = setInterval(timerStart, 1000);
    isStarted = !isStarted;
    jQuery("#helpToStart")
      .fadeOut(function () {
        jQuery(this).text("клик для паузы");
      })
      .fadeIn();
  } else {
    timerEnd();
    jQuery("#helpToStart")
      .fadeOut(function () {
        jQuery(this).text("клик для старта");
      })
      .fadeIn();
  }
});

function timerStart() {
  if (timerValue) {
    timerValue--;
    //переводим в формат времени
    transormTimeFormat();
  } else {
    timerEnd();
  }
}

function timerEnd() {
  clearTimeout(interval);
  $("#modal").fadeIn(500).delay(800).fadeOut(500);
  isStarted = false;
  jQuery("#helpToStart")
    .fadeOut(function () {
      jQuery(this).text("клик для старта");
    })
    .fadeIn();
}

// скролл на wrapper
let elem = document.querySelector("#wrapper");
if (elem.addEventListener) {
  if ("onwheel" in document) {
    // IE9+, FF17+, Ch31+
    elem.addEventListener("wheel", onWheel);
  } else if ("onmousewheel" in document) {
    // устаревший вариант события
    elem.addEventListener("mousewheel", onWheel);
  } else {
    // Firefox < 17
    elem.addEventListener("MozMousePixelScroll", onWheel);
  }
} else {
  // IE8-
  elem.attachEvent("onmousewheel", onWheel);
}

function onWheel(e) {
  e = e || window.event;
  //скрывает подсказку
  jQuery("#setTimeHelper").css("color", "black");
  // wheelDelta не даёт возможность узнать количество пикселей
  var delta = -(e.deltaY || e.detail || e.wheelDelta) / 100;
  delta = Math.floor(delta);
  // если таймер меньше 0, то сохраняем 0
  if (+timerValue + delta < 0) {
    timerValue = 0;
  } else {
    timerValue = +timerValue + delta;
  }

  //переводим в формат времени
  transormTimeFormat();

  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

// скролл на #minutes
let minutesScroll = document.querySelector("#minutes");
if (minutesScroll.addEventListener) {
  if ("onwheel" in document) {
    // IE9+, FF17+, Ch31+
    minutesScroll.addEventListener("wheel", onWheelHour);
  } else if ("onmousewheel" in document) {
    // устаревший вариант события
    elem.addEventListener("mousewheel", onWheelHour);
  } else {
    // Firefox < 17
    minutesScroll.addEventListener("MozMousePixelScroll", onWheelHour);
  }
} else {
  // IE8-
  minutesScroll.attachEvent("onmousewheel", onWheelHour);
}

function onWheelHour(e) {
  e = e.stopPropagation() || window.event;
  // wheelDelta не даёт возможность узнать количество пикселей
  var delta = -(e.deltaY || e.detail || e.wheelDelta) / 100;
  delta = Math.floor(delta) * 60;
  // если таймер меньше 0, то сохраняем 0
  if (+timerValue + delta < 0) {
    timerValue = 0;
  } else {
    timerValue = +timerValue + delta;
  }

  //переводим в формат времени
  transormTimeFormat();

  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

// трансформация формата времени
function transormTimeFormat() {
  let gettedTime = timerValue;
  let timeDivision = gettedTime / 60;
  let minutes = Math.trunc(timeDivision);
  let seconds = gettedTime % 60;

  $("#seconds").text(seconds);
  $("#minutes").text(minutes);
}

transormTimeFormat();

// позиция мыши для подсказки
let helpToStart = document.querySelector("#helpToStart");
helpToStart.style.left = "30px";

$("#wrapper").mousemove(function getPos(event) {
  helpToStart.style.left = event.pageX - 120 + "px";
  helpToStart.style.top = event.pageY - 30 + "px";
  jQuery("#helpToStart").fadeIn();
});
