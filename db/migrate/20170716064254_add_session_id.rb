class AddSessionId < ActiveRecord::Migration[5.0]
  def change
    add_column :histories, :session_id, :string
  end
end
