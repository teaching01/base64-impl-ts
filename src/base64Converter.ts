import { Buffer } from 'buffer'
import { base64Map } from './utils'

export function base64(message: string, padding = true): string {
  // 1. to binary
  const messageBytes = Buffer.from(message)
  console.log(`1. messageBytes: ${messageBytes}`)

  // 2. to bit string
  const messageBitString = convertToBitString(messageBytes)
  console.log(`2. messageBitString: ${messageBitString}`)

  // 3. split to 6 blocks
  const messageBitArray = splitTo6(messageBitString)
  console.log(`3. messageBitArray: ${messageBitArray}`)

  // 4. convert to base64 string
  const messageBase64 = convertToBase64(messageBitArray, padding)
  console.log(`4. messageBase64: ${messageBase64}`)

  return messageBase64
}

export function convertToBitString(buffer: Buffer) {
  function numToBitString8(num: Number) {
    let binString = num.toString(2)
    while (binString.length < 8) {
      binString = '0' + binString
    }
    return binString
  }

  let bitString = ''
  for (const buf of buffer) {
    bitString += numToBitString8(buf)
  }
  return bitString
}

export function splitTo6(bitString: string) {
  let tmp = bitString
  while (tmp.length % 6 !== 0) {
    tmp += '0'
  }
  let bitArray = []
  for (let i = 0; i < tmp.length / 6; i++) {
    bitArray.push(tmp.substring(i * 6, i * 6 + 6))
  }
  return bitArray
}

export function convertToBase64(bitArray: string[], padding = true) {
  const base64Array = bitArray.map(base64Map)
  const base64NoPadding = base64Array.toString().replace(/,/g, '')
  if (padding) {
    let base64Padding = base64NoPadding
    while (base64Padding.length % 4 != 0) {
      base64Padding += '='
    }
    return base64Padding
  } else {
    return base64NoPadding
  }
}
