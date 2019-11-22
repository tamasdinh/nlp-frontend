import { serverURL, port } from '../client/js/localhost'
const fetch = require('node-fetch')

describe('Express server successfully obtains API data', () => {

  test('Express server obtains non-empty object', () => {
    const formText = 'this was a terrible movie'
    
    const endPoint = 'sentiment'
    const baseURL = `${serverURL}:${port}/${endPoint}`
    const urlToUse = new URL(baseURL)
    const params = {text: formText, mode: 'tweet'}
    Object.keys(params).forEach(key => urlToUse.searchParams.append(key, params[key]))
    
    return fetch(urlToUse, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({formText})
    })
    .then(response => response.json())
    .then(result => {
      expect(Object.values(result).length).toBeGreaterThan(0)
    })
  })

  test('Express server obtains sensible values', () => {
    const formText = 'this was a terrible movie'
    
    const endPoint = 'sentiment'
    const baseURL = `${serverURL}:${port}/${endPoint}`
    const urlToUse = new URL(baseURL)
    const params = {text: formText, mode: 'tweet'}
    Object.keys(params).forEach(key => urlToUse.searchParams.append(key, params[key]))
    
    return fetch(urlToUse, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({formText})
    })
    .then(response => response.json())
    .then(result => {
      expect(result.polarity).toEqual('negative')
      expect(result.subjectivity).toEqual('subjective')
    })
  })

})
