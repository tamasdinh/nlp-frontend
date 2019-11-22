import { inputCheck } from './js/inputCheck'
import { handleSubmit } from './js/formHandler'

import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'

document.getElementById('button').addEventListener('click', (event) => {
  const results = document.getElementById('results')
  results.innerHTML = ''
  const formText = document.getElementById('input-form').value
  const problem = inputCheck(formText)
  if (problem === true) {
    results.innerHTML = 'Your input seems looks like a url. Please reconsider your submission.'
  } else {
    handleSubmit(formText)
  }
})