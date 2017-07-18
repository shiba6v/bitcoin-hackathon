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
        resultBlock: null,
        version: 0x20000002,
        prevBlock: '0000000000000000011e41ee8a75d92a05555589d53f25627ac8226192ddfe53',
        markleRoot: 'b440b224c33a8d34a35fdcd856b59f4cdfe6294bb2d318b58a40317be4d771b6',
        prevTimestamp: '2017-07-15 04:48:47',
        bits: 402742748,
        isMined: false
      },
      rangeStart: 1818331197,
      rangeEnd: 1818343197,
      nonceRange: [],
      resultMesage: null,
      result: null,
      isCalculating: false,
    }
  },
  methods: {
    async startCalc () {
      this.isCalculating = await true
      
      this.exec()
    },
    async exec () {
      const convertVersion = this.convertNum(this.info.version)
      const convertPrev = this.convertString(this.info.prevBlock)
      const convertMarkle = this.convertString(this.info.markleRoot)
      const convertTimestamp = this.convertNum(this.info.prevTimestamp)
      // const convertTimestamp = this.convertTimestamp()
      const convertBits = this.convertNum(this.info.bits)
      const base = convertVersion + convertPrev + convertMarkle + convertTimestamp + convertBits

      // console.log(convertVersion)
      // console.log(convertPrev)
      // console.log(convertMarkle)
      // console.log(convertTimestamp)
      // console.log(convertBits)

      const start = this.rangeStart
      const end = this.rangeEnd

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

        if (this.isGoldenTicket(result)) {
          this.exitCalc(i)
          break
        }
      }

      this.sendResult()
    },
    generateHash (base, nonce) {
      const headerHex = base + nonce

      const headerBin = this.hex2bin(headerHex)
      const pass1 = this.hex2bin(sha256(headerBin))
      const pass2 = sha256(pass1)
      return this.convertString(pass2)
    },
    exitCalc (nonce) {
      this.resultMesage = `You have found the Golden TIcket!`
      this.result = nonce
      console.log(this.trayingAt)
      this.isCalculating = false

    },
    isGoldenTicket (num) {
      if (num.match(/^00000000000000000/gi)) console.log(num)
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
      // const date = new Date(this.info.timestamp).getTime()
      // console.log('date is ')
      // console.log(date)
      const unixDate = new Date('1970-01-01 00:00:00').getTime()
      const diff = String(this.info.timestamp - unixDate).split('').slice(0, 10).join('')

      return this.convertNum(Number(diff))
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
      const start = this.rangeStart
      const end = this.rangeEnd

      for (let i = start; i <= end; i++) {
        this.nonceRange.push(this.convertNum(i))
      }
    },
    async fetch () {
      const url = '/api/v1/blocks/latest'
      const {block: block} = await HTTP.get(url)
      this.info = block
      console.log(block)
      this.getRange()
    },
    async getRange () {
      try {
        const url = '/api/v1/blocks/range'
        const data = await HTTP.get(url, {
          resultBlock: this.info.resultBlock
        })
        this.rangeStart = data.rangeStart
        this.rangeEnd = data.rangeEnd
      } catch (e) {
        alert(e.body.message)
      }
    },
    async sendResult () {
      try {
        const url = '/api/v1/blocks/result'
        const data = await HTTP.post(url, {
          resultBlock: this.info.resultBlock,
          rangeStart: this.rangeStart,
          rangeEnd: this.rangeEnd,
          result: this.result
        })
        if (!this.result) {
          this.rangeStart = data.rangeStart
          this.rangeEnd = data.rangeEnd
          this.exec()
        } else {
        }
      } catch (e) {
        alert(e.body.message)
      }
    }
  },
  mounted () {
    this.fetch()
    // this.mining()
    // this.test()
    this.generateRange()
    setInterval(this.updateCalcTimes, 1000)
  }
}
