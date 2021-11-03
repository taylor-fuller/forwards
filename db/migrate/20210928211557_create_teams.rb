class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false, unique: true
      t.integer :lead_id, null: false
      t.timestamps
    end

    add_index :teams, [:name, :lead_id], unique: true
  end
end
