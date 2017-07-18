json.block do
  json.(
    @latest_block,
    :result_block, :prev_block, :prev_timestamp, :markle_root, :version, :bits, :nonce, :is_mined
  )
end
