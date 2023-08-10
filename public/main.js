const createForm = document.querySelector('#myForm form')
const updateForm = document.querySelector(
  'form[action="/user-update"]',
)

createForm.addEventListener('submit', function (event) {
  const inputs = createForm.querySelectorAll('input')
  let isValid = false

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() !== '') {
      isValid = true
      break
    }
  }

  if (!isValid) {
    event.preventDefault()
    alert(
      'Будь ласка, заповніть хоча б одне поле перед відправкою форми.',
    )
  }
})

updateForm.addEventListener('submit', function (event) {
  const inputs = updateForm.querySelectorAll('input')
  let isValid = false

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value.trim() !== '') {
      isValid = true
      break
    }
  }

  if (!isValid) {
    event.preventDefault()
    alert(
      'Будь ласка, заповніть хоча б одне поле перед відправкою форми.',
    )
  }
})

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