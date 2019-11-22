import { serverURL, port } from './localhost'
const fetch = require('node-fetch') // for testing purposes

export function handleSubmit(formText) {
  
  //cleaning up previous results
  const resultsContainer = document.getElementById('results');
  if (resultsContainer) { // added for testability
    const listExists = resultsContainer.children.length > 0
    if (listExists) {
      const selectedNode = document.getElementById('results')
      while (selectedNode.firstChild) {
        selectedNode.removeChild(selectedNode.firstChild)
      }
    }
  }

  const endPoint = 'sentiment'
  const baseURL = `${serverURL}:${port}/${endPoint}`
  
  const urlToUse = new URL(baseURL)
  const params = {text: formText, mode: 'tweet'}
  Object.keys(params).forEach(key => urlToUse.searchParams.append(key, params[key]))

  return new Promise((resolve, reject) => {

    fetch(urlToUse, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({formText})
    })
    .then(response => response.json())
    .then(feedback => {
      
      // Create a documentFragment to which we can attach list items as children
      const scaffold = document.createDocumentFragment();
      
      // For all items in the response json object, list items are generated and
      // added to the DocumentFragment
      Object.keys(feedback).forEach(key => {
        if (key !== 'text') {
          // Omitting "text" variable as it can be seen in the input form anyways
          const newElement = document.createElement('li');
          if (typeof feedback[key] === 'number') {
            // If variable is a number, convert to % and show only 2 decimals
            let num = (feedback[key] * 100).toFixed(2)
            newElement.innerHTML = key + ':\t' + num + '%';
          } else {
            newElement.innerHTML = key + ':\t' + feedback[key];
          }
          scaffold.appendChild(newElement);
        }
      })
      // Appending the created list elements as children
      if (resultsContainer) {
        resultsContainer.appendChild(scaffold);
      }
      resolve(feedback)
    })
    .catch(error => {
      alert('An error has occurred while fetching sentiment:', error)
      reject(error)
    })
  })
}