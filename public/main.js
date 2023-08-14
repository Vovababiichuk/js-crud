var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});

// Audio===========================

const audio = document.getElementById("myAudio");
const playButton = document.getElementById("playButton");

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playButton.innerHTML = '<i class="fa fa-pause pulsating-icon"></i>';
  } else {
    audio.pause();
    playButton.innerHTML = '<i class="fa fa-play"></i>';
  }
}

// ===================


