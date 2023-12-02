import { program } from 'commander'
import { base64 } from './base64Converter'
import { reverseBase64 } from './base64Reverser'

program
  .name('base64-converter')
  .description('convert utf-8 string to base64 string')

program
  .command('convert')
  .argument('<message>', 'string to convert')
  .option('-n, --no-padding', 'no padding')
  .action((message, options) => {
    console.log(`original message: ${message}`)
    console.log(`padding?: ${options.padding}`)
    base64(message, options.padding)
  })

program
  .command('reverse')
  .argument('<message>', 'base64 string to reverse')
  .action((message, options) => {
    console.log(`original message: ${message}`)
    reverseBase64(message)
  })

program.parse()
