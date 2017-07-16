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
      this.histories = params.history
      this.count = params.count
      console.log(this.histories)
    },
  },
  mounted () {
    setInterval(this.fetch(), 5000)
  }
}
