import { base64MapReverse } from './utils'

export function reverseBase64(base64String: string) {
  // 1. get bit array
  const bitArray = getBitArray(base64String)
  console.log(`1. bit array: ${bitArray}`)

  // 2. get bit string
  const bitString = getBitString(bitArray)
  console.log(`2. bit string: ${bitString}`)

  // 3. get hex array
  const hexArray = getHexArray(bitString)
  console.log(`3. hex array: ${hexArray}`)

  // 4. get utf-8 string
  const reversed = getUtf8String(hexArray)
  console.log(`4. utf-8 string: ${reversed}`)

  return reversed
}

export function getBitArray(base64String: string) {
  const bits: string[] = []
  for (const char of base64String) {
    if (char === '=') {
      continue
    }
    bits.push(base64MapReverse(char))
  }

  return bits
}

export function getBitString(bitArray: string[]) {
  let bitString = ''
  for (const bit of bitArray) {
    bitString += bit
  }

  return bitString
}

export function getHexArray(bitString: string) {
  let hexArray = []
  const count = Math.floor(bitString.length / 8)
  for (let i = 0; i < count; i++) {
    const hex = parseInt(bitString.substring(i * 8, i * 8 + 8), 2).toString(16)
    hexArray.push(hex)
  }
  return hexArray
}

export function getUtf8String(hexArray: string[]) {
  let reversed = ''
  for (const hex of hexArray) {
    const utf8 = Buffer.from(hex, 'hex').toString()
    reversed += utf8
  }
  return reversed
}
