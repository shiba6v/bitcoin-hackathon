import HTTP from './../http';
import sha256 from 'js-sha256'

export default {
  name: 'hello',
  computed: {
  },
  data () {
    return {
      calcTimesView: 0,
      calcTimes: 0,
      calcSpeed: 'null',
      tryingAt: null,
      info: {
        version: 0x20000000,
        prevBlock: '000000000000000000b86ce8d943cec4b00b9c100648d58fc89dc8393c7a56aa',
        markleRoot: '10f6939f3827150184683beda19ac47fce798c10a8043180b1572ae2b3620ab7',
        timestamp: '2017-07-16 01:11:04',
        bits: 402742748,
        rangeStart: 208151644,
        rangeEnd: 208162654
      },
      nonceRange: [],
      resultMesage: null
    }
  },
  methods: {
    async countCalc () {
      for (let nonce in this.nonceRange) {
        console.log(nonce)
        this.calcTimes++
        this.tryingAt = nonce
      }
    },
    async exec () {
      const convertVersion = this.convertNum(this.info.version)
      const convertPrev = this.convertString(this.info.prevBlock)
      const convertMarkle = this.convertString(this.info.markleRoot)
      const convertTimestamp = this.convertTimestamp()
      const convertBits = this.convertNum(this.info.bits)
      const base = convertVersion + convertPrev + convertMarkle + convertTimestamp + convertBits

      // console.log(convertVersion)
      // console.log(convertPrev)
      // console.log(convertMarkle)
      // console.log(convertTimestamp)
      // console.log(convertBits)

      const start = this.info.rangeStart
      const end = this.info.rangeEnd

      for (let i = start; i <= end; i++) {
        console.log(i)
        this.calcTimes++
        this.tryingAt = i
        const nonce = this.convertNum(i)
        // console.log(nonce)

        // console.log(headerHex)

        //
        // console.log(headerBin)
        // console.log(sha256(headerBin))
        // console.log(pass1)
        // console.log(pass2)

        const result = await this.generateHash(base, nonce)

        if (this.isGoldenTicket(result)) this.exitCalc(i)
      }
    },
    generateHash (base, nonce) {
      const headerHex = base + nonce

      const headerBin = this.hex2bin(headerHex)
      const pass1 = this.hex2bin(sha256(headerBin))
      const pass2 = sha256(pass1)
      return this.convertString(pass2)
    },
    exitCalc (nonce) {
      this.resultMesage = `You found the Golden TIcket! ${nonce}`
      console.log(this.trayingAt)
    },
    isGoldenTicket (num) {
      console.log(num)
      return num.match(/^00000000000000000/gi)
    },
    updateCalcTimes () {
      this.calcTimesView = this.calcTimes
    },
    pack (format) {
      let formatPointer = 0
      let argumentPointer = 1
      let result = ''
      let i = 0
      let instruction, quantifier
      // lets used by float encoding

      while (formatPointer < format.length) {
        instruction = 'V'
        quantifier = ''
        formatPointer++
        while ((formatPointer < format.length) && (format.charAt(formatPointer).match(/[\d*]/) !== null)) {
          quantifier += format.charAt(formatPointer)
          formatPointer++
        }
        if (quantifier === '') {
          quantifier = '1'
        }
        // Now pack variables: 'quantifier' times 'instruction'
        switch (instruction) {
          case 'V':
            // signed integer (machine dependent size and byte order)
            // unsigned integer (machine dependent size and byte order)
            // signed long (always 32 bit, machine byte order)
            // unsigned long (always 32 bit, machine byte order)
            // unsigned long (always 32 bit, little endian byte order)
            if (quantifier === '*') {
              quantifier = arguments.length - argumentPointer
            }
            if (quantifier > (arguments.length - argumentPointer)) {
              throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments')
            }
            for (i = 0; i < quantifier; i++) {
              result += String.fromCharCode(arguments[argumentPointer] & 0xFF)
              result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF)
              result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF)
              result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF)
              argumentPointer++
            }
            break
          default:
            throw new Error('Warning: pack() Type ' + instruction + ': unknown format code')
        }
      }
      if (argumentPointer < arguments.length) {
        const msg2 = 'Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused'
        throw new Error(msg2)
      }
      return result
    },
    convertString (str) {
      str = str.split('').reverse().join('')
      let array = []
      for (let i = 0; i < str.length; i += 2) {
        array.push(str[i + 1])
        array.push(str[i])
      }
      return array.join('')
    },
    convertNum (num) {
      return this.bin2hex(this.pack('V*', num))
    },
    convertTimestamp () {
      const date = new Date(this.info.timestamp).getTime()
      const unixDate = new Date('1970-01-01 00:00:00').getTime()
      const diff = String(date - unixDate).split('').slice(0, 10).join('')

      return this.convertNum(Number(diff))
    },
    unicode2utf8_uint8array (str) {
      let n = str.length
      let idx = -1
      let byteLength = 32
      let bytes = new Uint8Array(byteLength)
      let i
      let c
      let _bytes

      for (i = 0; i < n; ++i) {
        c = str.charCodeAt(i)
        if (c <= 0x7F) {
          bytes[++idx] = c
        } else if (c <= 0x7FF) {
          bytes[++idx] = 0xC0 | (c >>> 6)
          bytes[++idx] = 0x80 | (c & 0x3F)
        } else if (c <= 0xFFFF) {
          bytes[++idx] = 0xE0 | (c >>> 12)
          bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F)
          bytes[++idx] = 0x80 | (c & 0x3F)
        } else {
          bytes[++idx] = 0xF0 | (c >>> 18)
          bytes[++idx] = 0x80 | ((c >>> 12) & 0x3F)
          bytes[++idx] = 0x80 | ((c >>> 6) & 0x3F)
          bytes[++idx] = 0x80 | (c & 0x3F)
        }
        // 倍々でメモリを確保していく
        if (byteLength - idx <= 4) {
          _bytes = bytes
          byteLength *= 2
          bytes = new Uint8Array(byteLength)
          bytes.set(_bytes)
        }
      }
      return bytes.subarray(0, ++idx)
    },
    hex2bin (hex) {
      return new Buffer(hex, 'hex')
    },
    bin2hex (bin) {
      const _bin2hex = [
        '0', '1', '2', '3', '4', '5', '6', '7',
        '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'
      ]

      let len = bin.length
      let rv = ''
      let i = 0
      let c

      while (len-- > 0) {
        c = bin.charCodeAt(i++)

        rv += _bin2hex[(c & 0xf0) >> 4]
        rv += _bin2hex[(c & 0x0f)]
      }

      return rv
    },
    generateRange () {
      const start = this.info.rangeStart
      const end = this.info.rangeEnd

      for (let i = start; i <= end; i++) {
        this.nonceRange.push(this.convertNum(i))
      }
    },
    async fetch () {
      const url = 'https://bitcoin-hackathon.herokuapp.com/apis'
      const params = await HTTP.get(url)
      console.log(params)
    },
    sendResult () {

    }
  },
  mounted () {
    // this.fetch()
    // this.mining()
    // this.test()
    this.generateRange()
    setInterval(this.updateCalcTimes, 1000)
  }
}