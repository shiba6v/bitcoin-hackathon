class ApisController < ApplicationController
  before_action :set_api, only: [:show, :edit, :update, :destroy]

  # GET /apis
  # GET /apis.json
  def index
    @apis = Api.all
    a = {rangeStart: 3713400261,rangeEnd: 3713410262,prevBlock: "0000000000000000011e41ee8a75d92a05555589d53f25627ac8226192ddfe53",markleRoot: "b440b224c33a8d34a35fdcd856b59f4cdfe6294bb2d318b58a40317be4d771b6", timestamp: "2017-07-15 04:48:47",bits: 402742748}
    @block = Api.first
    a = {rangeStart: 3713400261,rangeEnd: 3713410262,prevBlock: @block.prev_block,markleRoot: @block.markle_root, timestamp: @block.prev_timestamp.to_i,bits: @block.bits}
    render :json => a
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
    # Use callbacks to share common setup or constraints between actions.
    def set_api
      @api = Api.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def api_params
      params.require(:api).permit(:previous_block, :nonce, :prev_timestamp, :success)
    end
end
