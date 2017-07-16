class ChangeTimstampToString < ActiveRecord::Migration[5.0]
  def change
    change_column :blocks, :prev_timestamp, :string, null: false
  end
end
