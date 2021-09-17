function mytagFunc(strings, name, gender) {
  console.log(strings, name, gender);
}

const result = mytagFunc`hey, ${name} is a ${gender}`