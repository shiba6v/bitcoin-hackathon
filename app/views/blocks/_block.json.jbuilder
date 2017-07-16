json.extract! block, :id, :previous_block, :nonce, :prev_timestamp, :success, :created_at, :updated_at
json.url block_url(block, format: :json)
