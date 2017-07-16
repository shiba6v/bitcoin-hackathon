class CreateApis < ActiveRecord::Migration[5.0]
  def change
    create_table :apis do |t|
      t.string :prev_block
      t.datetime :prev_timestamp
      t.integer :bits
      t.string :markle_root
      t.string :result_block
      t.integer :version, limit: 8

      t.timestamps
    end
  end
end
