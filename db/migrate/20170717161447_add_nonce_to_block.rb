class AddNonceToBlock < ActiveRecord::Migration[5.0]
  def change
    add_column :blocks, :nonce, :text
    add_column :blocks, :is_mined, :boolean, default: false
  end
end
