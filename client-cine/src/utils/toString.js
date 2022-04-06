export const toString = (array) => {
  let string = ''
  array.forEach(e => string = `${string}, ${e.name}`)
  return string
}