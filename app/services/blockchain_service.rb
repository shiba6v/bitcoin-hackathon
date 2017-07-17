require 'nokogiri'
require 'json'
require 'mechanize'

class BlockchainService

  AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.94 Safari/537.36"

  def initialize
    @agent = Mechanize.new(user_agent: AGENT)
  end

  def latest_block
    url = 'https://blockchain.info/ja/latestblock'
    latest_block = get_json(url)

    latest_block["hash"]
  end

  def get_block(block_hash)
    url = 'https://blockchain.info/ja/rawblock/' + block_hash

    block = get_json(url)

    {
      result_block: block_hash,
      prev_block: block["prev_block"],
      prev_timestamp: block["time"],
      markle_root: block["mrkl_root"],
      version: block["ver"],
      bits: block["bits"],
      nonce: block["nonce"],

    }
  end

  private
    # Returns Nokogiri Object
    def get_page(url)
      page = @agent.get(url)

      Nokogiri::HTML(page.body)
    end

    def get_json(url)
      JSON.parse(@agent.get(url).body)
    end

end
