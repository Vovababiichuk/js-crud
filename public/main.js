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
