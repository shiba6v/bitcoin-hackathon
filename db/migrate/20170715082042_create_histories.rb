class CreateHistories < ActiveRecord::Migration[5.0]
  def change
    create_table :histories do |t|
      t.integer :nonce_start, null: false, limit: 8
      t.integer :nonce_end, null: false, limit: 8
      t.string :prev_block, null: false
      t.string :result_block
      t.timestamps
    end
  end
end
