const calculadora = require('../../models/calculadora.js')

test('sum numbers', () => {
  expect(calculadora.sum(1, 2)).toBe(3)
})

test('divide numbers', () => {
  expect(calculadora.divide(4, 2)).toBe(2)
})

test('multiply numbers', () => {
  expect(calculadora.multiply(2, 2)).toBe(4)
})

test('subtract numbers', () => {
  expect(calculadora.subtract(4, 2)).toBe(2)
})
