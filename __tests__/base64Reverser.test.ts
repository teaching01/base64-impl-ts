import {
  getBitArray,
  getBitString,
  getHexArray,
  getUtf8String,
  reverseBase64,
} from '../src/base64Reverser'

describe('reverseBase64 function', () => {
  it('should success with padding', () => {
    const input = 'aGVsbG8gd29ybGQhPyY6Lw=='
    const expected = 'hello world!?&:/'
    const result = reverseBase64(input)

    expect(result).toEqual(expected)
  })

  it('should success without padding', () => {
    const input = 'aGVsbG8gd29ybGQhPyY6Lw'
    const expected = 'hello world!?&:/'
    const result = reverseBase64(input)

    expect(result).toEqual(expected)
  })
})

describe('getBitArray function', () => {
  it('should success', () => {
    const input = 'aGVsbG8gd29ybGQhPyY6Lw=='
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
    const result = getBitArray(input)

    expect(result).toEqual(expected)
  })
})

describe('getBitArray function', () => {
  it('should success', () => {
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

    const expected =
      '011010000110010101101100011011000110111100100000011101110110111101110010011011000110010000100001001111110010011000111010001011110000'

    const result = getBitString(input)

    expect(result).toEqual(expected)
  })
})

describe('getHexArray function', () => {
  it('should success', () => {
    const input =
      '011010000110010101101100011011000110111100100000011101110110111101110010011011000110010000100001001111110010011000111010001011110000'
    const expeted = [
      '68',
      '65',
      '6c',
      '6c',
      '6f',
      '20',
      '77',
      '6f',
      '72',
      '6c',
      '64',
      '21',
      '3f',
      '26',
      '3a',
      '2f',
    ]

    const result = getHexArray(input)

    expect(result).toEqual(expeted)
  })
})

describe('getUtf8String function', () => {
  it('should success', () => {
    const input = [
      '68',
      '65',
      '6c',
      '6c',
      '6f',
      '20',
      '77',
      '6f',
      '72',
      '6c',
      '64',
      '21',
      '3f',
      '26',
      '3a',
      '2f',
    ]
    const expected = 'hello world!?&:/'

    const result = getUtf8String(input)

    expect(result).toEqual(expected)
  })
})
