import HTTP from './../http';

export default {
  computed: {
  },
  data () {
    return {
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
  },
  mounted () {
    // this.fetch()
    setInterval(this.fetch(), 10000)
  }
}
