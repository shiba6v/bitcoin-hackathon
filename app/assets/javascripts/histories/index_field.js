import HTTP from './../http';

export default {
  computed: {
  },
  data () {
    return {
      blocks: [],
      histories: [],
      count: 0,
    }
  },
  methods: {
    async fetch () {
      const url = '/api/v1/histories'
      const params = await HTTP.get(url)
      this.histories = params
    },
    async getBlocks () {
      const url = '/api/v1/blocks'
      const {blocks: blocks} = await HTTP.get(url)
      this.blocks = blocks
      console.log(blocks)
    }
  },
  mounted () {
    this.fetch()
    this.getBlocks()
    // setInterval(this.fetch(), 10000)
  }
}
