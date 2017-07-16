class BlocksController < ApplicationController
  before_action :set_block, only: [:reload]
  skip_before_filter :verify_authenticity_token
  RANGE = 10000
  OFFSET = 	3713310261

  # GET /blocks
  # GET /blocks.json
  def index
    @blocks = Block.all
  end

  def start
    render :json => generate_range
  end

  def reload
    @history = History.find_by(prev_block: @request[:prevBlock], nonce_start: @request[:rangeStart], nonce_end: @request[:rangeEnd])
    @history.finish = true
    @history.save
    @block = Block.find_by(prev_block: @request[:prevBlock])
    @block.result_block = @request[:result]
    @block.save

    if @request[:result]
      puts "======================"
      puts @request[:result]
      puts "======================"
    end

    render :json => generate_range
  end

  # GET /blocks/1
  # GET /blocks/1.json
  def show
  end

  # GET /blocks/new
  def new
    @block = Block.new
  end

  # GET /blocks/1/edit
  def edit
  end

  # POST /blocks
  # POST /blocks.json
  def create
    @block = Block.new(block_params)

    respond_to do |format|
      if @block.save
        format.html { redirect_to @block, notice: 'Block was successfully created.' }
        format.json { render :show, status: :created, location: @block }
      else
        format.html { render :new }
        format.json { render json: @block.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /blocks/1
  # PATCH/PUT /blocks/1.json
  def update
    respond_to do |format|
      if @block.update(block_params)
        format.html { redirect_to @block, notice: 'Block was successfully updated.' }
        format.json { render :show, status: :ok, location: @block }
      else
        format.html { render :edit }
        format.json { render json: @block.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /blocks/1
  # DELETE /blocks/1.json
  def destroy
    @block.destroy
    respond_to do |format|
      format.html { redirect_to blocks_url, notice: 'Block was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def generate_range
      block = Block.last
      prev_history = History.where(prev_block: block.prev_block).last
      nonce_end = prev_history.nil? ? OFFSET : prev_history.nonce_end
      puts prev_history
      @history = History.new(prev_block: block.prev_block,nonce_start: nonce_end + 1, nonce_end: nonce_end + RANGE)
      @history.save
      assignment = {rangeStart: @history.nonce_start,rangeEnd: @history.nonce_end,prevBlock: @history.prev_block,markleRoot: block.markle_root, timestamp: block.prev_timestamp.to_i,bits: block.bits, version: block.version}
      return assignment
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_block
      @request = JSON.parse(request.body.read, {:symbolize_names => true})
      @block = Block.find_by(prev_block: @request[:prev_block])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def block_params
      params.require(:block).permit(:previous_block, :nonce, :prev_timestamp, :success)
    end
end
