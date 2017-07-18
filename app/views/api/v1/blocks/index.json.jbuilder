json.blocks do
  json.array!(@blocks) do |block|
    json.(
      block,
      :id, :prev_block, :prev_timestamp, :bits, :markle_root, :result_block, :version, :nonce, :is_mined, :miner_id
    )
  end
end
