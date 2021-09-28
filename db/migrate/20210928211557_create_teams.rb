class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false
      t.integer :lead_id, null: false
      t.timestamps
    end
  end
end
