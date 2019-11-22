import { handleSubmit } from '../client/js/formHandler'

describe('handleSubmit successfully retrieves AYLIEN API information', () => {

  test('API call sends the right text to the API', () => {
    const formText = 'this was a terrible movie'
    return handleSubmit(formText).then(result => {
      expect(result.text).toBe(formText)
    })
  })

  test('API call returns a non-empty response', () => {
    const formText = 'this was a terrible movie'
    return handleSubmit(formText).then(result => {
      expect(Object.values(result).length).toBeGreaterThan(0)
    })
  })

  test('API call returns data w/ correct types', () => {
    const formText = 'this was a terrible movie'
    return handleSubmit(formText)
    .then(result => {
      expect(typeof result.polarity).toBe('string')
      expect(typeof result.subjectivity).toBe('string')
      expect(typeof result.text).toBe('string')
      expect(typeof result.polarity_confidence).toBe('number')
      expect(typeof result.subjectivity_confidence).toBe('number')
    })
  })

  test('API call returns data w/ sensible values', () => {
    const formText = 'this was a terrible movie'
    return handleSubmit(formText)
    .then(result => {
      expect(result.polarity.length).toBeGreaterThan(0)
      expect(result.subjectivity.length).toBeGreaterThan(0)
      expect(result.text.length).toBeGreaterThan(0)
      expect(result.polarity_confidence).toBeLessThan(1.01)
      expect(result.subjectivity_confidence).toBeLessThan(1.01)
      expect(result.polarity_confidence).toBeGreaterThan(-1.01)
      expect(result.subjectivity_confidence).toBeGreaterThan(-1.01)
    })
  })

})