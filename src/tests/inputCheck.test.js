import { inputCheck } from '../client/js/inputCheck'

describe('inputCheck successfully retrieves AYLIEN API information', () => {

  test('url call gets rejected', () => {
    const formText = 'http://index.hu'
    expect(inputCheck(formText)).toBe(true)
  })

  test('non-url call does not get rejected', () => {
    const formText = 'Hello I brought an http handler'
    expect(inputCheck(formText)).toBe(false)
  })

})