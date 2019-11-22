export function inputCheck(inputText) {

  let problem = false;
  if (inputText.search(/http(s*)\:\/\//) >= 0) {
    problem = true
  }
  return problem
}