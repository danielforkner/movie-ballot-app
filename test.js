function check(str) {
  let arr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      arr.push(')');
    }
    if (str[i] === '{') {
      arr.push('}');
    }
    if (str[i] === '[') {
      arr.push(']');
    }
    if (str[i] === ')') {
      let pop = arr.pop();
      if (pop != str[i]) return false;
    }
    if (str[i] === '}') {
      let pop = arr.pop();
      if (pop != str[i]) return false;
    }
    if (str[i] === ']') {
      let pop = arr.pop();
      if (pop != str[i]) return false;
    }
  }
  return arr.length === 0;
}

let input = '([{(())}]]';

console.log(check(input));
