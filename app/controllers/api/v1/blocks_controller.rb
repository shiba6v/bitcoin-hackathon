class Api::V1::BlocksController < Api::AbstractController
  def index
    @blocks = Block.all
  end

  def latest
    blockchain_service = BlockchainService.new
    latest_block_hash = blockchain_service.latest_block
    @latest_block = Block.find_by(result_block: latest_block_hash)

    if @latest_block.blank?
      block_hash = blockchain_service.get_block(latest_block_hash)
      @latest_block = Block.create(block_hash)
    end
    # @latest_block = Block.last
  end

  def range
    result_block = params[:result_block]
    target_block = Block.find_by(result_block: result_block)
    unless target_block.is_mined
      histories = target_block.histories

      range_start = histories.last.blank? ? target_block.nonce.to_i - 10000 : histories.last.nonce_end + 1

      puts range_start
      range_end = range_start + 2999


      render json: {range_start: range_start, range_end: range_end}, status: 200
    else
      render json: {message: "This block has been mined."}, status: 412
    end
  rescue => e
    puts e
    render json: { error: 'Something went wrong' }, status: 422
  end

  def result
    nonce = params[:result]
    result_block = params[:resultBlock]
    range_start = params[:rangeStart]
    range_end = params[:rangeEnd]

    target_block = Block.find_by(result_block: result_block)

    puts target_block

    history = History.create(nonce_start: range_start, nonce_end: range_end, block_id: target_block.id, prev_block: target_block.prev_block, session_id: current_session)

    if nonce.present?
      Block.find_by(result_block: result_block).update(is_mined: true, miner_id: current_session)
      render json: {message: "Congrats!"}, status: 200
    else
      redirect_to action: 'range', result_block: result_block
    end

  end
end
