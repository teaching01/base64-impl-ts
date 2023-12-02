import { Buffer } from 'buffer'
import { message } from '../constants'
import { base64Map, base64MapReverse } from '../utils'

console.log({ message })

const messageBytes = Buffer.from(message, 'utf-8')
console.log({ messageBytes })
// 68 65 6c 6c 6f 20 77 6f 72 6c 64 21 3f 26 3a 2f

const messageHex = messageBytes.toString('hex')
console.log({ messageHex })

const messageBin = messageBytes.toString('binary')
console.log({ messageBin })

const messageBase64 = messageBytes.toString('base64')
console.log({ messageBase64 })

function numToBitString8(num: Number) {
  let binString = num.toString(2)
  while (binString.length < 8) {
    binString = '0' + binString
  }
  return binString
}

function a(buffer: Buffer) {
  for (const buf of buffer) {
    const bin = numToBitString8(buf)
    const hex = buf.toString(16)
    console.log(`${hex} -> ${buf} -> ${bin}`)
  }
}

function convertToBitString(buffer: Buffer) {
  let bitString = ''
  for (const buf of buffer) {
    bitString += numToBitString8(buf)
  }
  return bitString
}

const bitString = convertToBitString(messageBytes)
console.log(bitString)

function splitTo6(bitString: string) {
  let tmp = bitString
  while (tmp.length % 6 !== 0) {
    tmp += '0'
  }
  let bitArray = []
  for (let i = 0; i < tmp.length / 6; i++) {
    bitArray.push(tmp.substring(i * 6, i * 6 + 6))
  }
  console.log(bitArray)
  return bitArray
}
const bitArray = splitTo6(bitString)

function convertToBase64(bitArray: string[], noPadding?: boolean) {
  const base64Array = bitArray.map(base64Map)
  const base64NoPadding = base64Array.toString().replace(/,/g, '')
  if (noPadding) {
    return base64NoPadding
  } else {
    let base64Padding = base64NoPadding
    while (base64Padding.length % 4 != 0) {
      base64Padding += '='
    }
    return base64Padding
  }
}

const base64 = convertToBase64(bitArray)
console.log({ base64 })

function convertBase64ToUtf8(base64String: string) {
  const bits: string[] = []
  for (const char of base64String) {
    if (char === '=') {
      continue
    }
    bits.push(base64MapReverse(char))
  }

  let bitString = ''
  for (const bit of bits) {
    bitString += bit
  }
  console.log(bitString)

  let reversed = ''
  const count = Math.floor(bitString.length / 8)
  for (let i = 0; i < count; i++) {
    const hex = parseInt(bitString.substring(i * 8, i * 8 + 8), 2).toString(16)
    const utf8 = Buffer.from(hex, 'hex').toString()
    reversed += utf8
  }
  return reversed
}

const reversed = convertBase64ToUtf8(base64)
console.log({ reversed })
