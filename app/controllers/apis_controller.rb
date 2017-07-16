class ApisController < ApplicationController
  before_action :set_api, only: [:reload]
  skip_before_filter :verify_authenticity_token
  RANGE = 1000000

  # GET /apis
  # GET /apis.json
  def index
    @apis = Api.all
  end

  def start
    render :json => generate_range
  end

  def reload
    @history = History.find_by(prev_block: @request[:prev_block], nonce_start: @request[:rangeStart], nonce_end: @request[:rangeEnd])
    @history.result_block = @request[:result]
    @history.save
    puts @history
    if @request[:result].nil?
      @api.success = 0 #失敗
    else
      @api.success = 1 #成功
    end
    @api.save
    render :json => generate_range
  end

  # GET /apis/1
  # GET /apis/1.json
  def show
  end

  # GET /apis/new
  def new
    @api = Api.new
  end

  # GET /apis/1/edit
  def edit
  end

  # POST /apis
  # POST /apis.json
  def create
    @api = Api.new(api_params)

    respond_to do |format|
      if @api.save
        format.html { redirect_to @api, notice: 'Api was successfully created.' }
        format.json { render :show, status: :created, location: @api }
      else
        format.html { render :new }
        format.json { render json: @api.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /apis/1
  # PATCH/PUT /apis/1.json
  def update
    respond_to do |format|
      if @api.update(api_params)
        format.html { redirect_to @api, notice: 'Api was successfully updated.' }
        format.json { render :show, status: :ok, location: @api }
      else
        format.html { render :edit }
        format.json { render json: @api.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /apis/1
  # DELETE /apis/1.json
  def destroy
    @api.destroy
    respond_to do |format|
      format.html { redirect_to apis_url, notice: 'Api was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def generate_range
      block = Api.last
      prev_history = History.where(prev_block: block.prev_block).last
      nonce_end = prev_history.nil? ? -1 : prev_history.nonce_end
      puts prev_history
      @history = History.new(prev_block: block.prev_block,nonce_start: nonce_end + 1, nonce_end: nonce_end + 1 + RANGE)
      @history.save
      assignment = {rangeStart: @history.nonce_start,rangeEnd: @history.nonce_end,prevBlock: @history.prev_block,markleRoot: block.markle_root, timestamp: block.prev_timestamp.to_i,bits: block.bits}
      return assignment
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_api
      @request = JSON.parse(request.body.read, {:symbolize_names => true})
      @api = Api.find_by(prev_block: @request[:prev_block])
      puts "~~~~~~"
      puts @api
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def api_params
      params.require(:api).permit(:previous_block, :nonce, :prev_timestamp, :success)
    end
end
