import {
  convertToBitString,
  splitTo6,
  convertToBase64,
} from '../src/base64Converter'

export const message = 'hello world!?&:/'

describe('convertToBitString', () => {
  it('should success', () => {
    const input = Buffer.from(message)
    const expected =
      '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001000010000100111111001001100011101000101111'

    const result = convertToBitString(input)
    expect(result).toEqual(expected)
  })
})

describe('splitTo6', () => {
  it('should success', () => {
    const input =
      '01101000011001010110110001101100011011110010000001110111011011110111001001101100011001000010000100111111001001100011101000101111'
    const expected = [
      '011010',
      '000110',
      '010101',
      '101100',
      '011011',
      '000110',
      '111100',
      '100000',
      '011101',
      '110110',
      '111101',
      '110010',
      '011011',
      '000110',
      '010000',
      '100001',
      '001111',
      '110010',
      '011000',
      '111010',
      '001011',
      '110000',
    ]

    const result = splitTo6(input)

    expect(result).toEqual(expected)
  })
})

describe('convertToBase64', () => {
  const input = [
    '011010',
    '000110',
    '010101',
    '101100',
    '011011',
    '000110',
    '111100',
    '100000',
    '011101',
    '110110',
    '111101',
    '110010',
    '011011',
    '000110',
    '010000',
    '100001',
    '001111',
    '110010',
    '011000',
    '111010',
    '001011',
    '110000',
  ]

  it('should success when padding = ture', () => {
    const expected = 'aGVsbG8gd29ybGQhPyY6Lw=='
    const result = convertToBase64(input)

    expect(result).toEqual(expected)
  })

  it('should success when padding = false', () => {
    const expected = 'aGVsbG8gd29ybGQhPyY6Lw'
    const result = convertToBase64(input, false)

    expect(result).toEqual(expected)
  })
})
