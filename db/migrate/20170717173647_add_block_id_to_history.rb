class AddBlockIdToHistory < ActiveRecord::Migration[5.0]
  def change
    add_column :histories, :result, :integer
    add_column :histories, :block_id, :integer
    add_column :blocks, :miner_id, :text
  end
end
