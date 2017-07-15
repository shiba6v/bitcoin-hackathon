require 'test_helper'

class ApisControllerTest < ActionDispatch::IntegrationTest
  setup do
    @api = apis(:one)
  end

  test "should get index" do
    get apis_url
    assert_response :success
  end

  test "should get new" do
    get new_api_url
    assert_response :success
  end

  test "should create api" do
    assert_difference('Api.count') do
      post apis_url, params: { api: { nonce: @api.nonce, prev_timestamp: @api.prev_timestamp, previous_block: @api.previous_block, success: @api.success } }
    end

    assert_redirected_to api_url(Api.last)
  end

  test "should show api" do
    get api_url(@api)
    assert_response :success
  end

  test "should get edit" do
    get edit_api_url(@api)
    assert_response :success
  end

  test "should update api" do
    patch api_url(@api), params: { api: { nonce: @api.nonce, prev_timestamp: @api.prev_timestamp, previous_block: @api.previous_block, success: @api.success } }
    assert_redirected_to api_url(@api)
  end

  test "should destroy api" do
    assert_difference('Api.count', -1) do
      delete api_url(@api)
    end

    assert_redirected_to apis_url
  end
end
