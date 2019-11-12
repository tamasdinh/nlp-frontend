function handleSubmit(event) {
  event.preventDefault()
  const listExists = (document.getElementById('results').children.length > 0)
    ? true : false
  if (listExists) {
    const selectedNode = document.getElementById('results')
    while (selectedNode.firstChild) {
      selectedNode.removeChild(selectedNode.firstChild)
    }
  }

  // check what text was put into the form field
  let formText = document.getElementById('name').value
  Client.checkForName(formText)

  const endPoint = 'sentiment'
  
  const baseURL = (DEV_MODE)
    ? `http://localhost:${HOME_PORT}/${endPoint}`
    : `https://api.aylien.com/api/v1/${endPoint}`

  console.log("::: Form Submitted :::")
  let fullURL = ''
  if (!DEV_MODE) {
    fullURL = new URL(baseURL)
    const params = {text: formText, mode: 'tweet'}
    Object.keys(params).forEach(key => fullURL.searchParams.append(key, params[key]))
  } else {
    fullURL = baseURL;
  }

  fetch(fullURL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // TODO: will this work when sent to Aylien directly?
      'X-AYLIEN-TextAPI-Application-ID': AYLIEN_ID,
      'X-AYLIEN-TextAPI-Application-Key': AYLIEN_KEY
    },
    body: JSON.stringify({formText})
  }).then(response => response.json())
  
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
    // Identifying the results parent element and appending the created
      // list elements as children
    const resultsContainer = document.getElementById('results');
    resultsContainer.appendChild(scaffold);
  })
  .catch(error => {
    alert('An error has occurred:', error)
  })
}

export { handleSubmit }
