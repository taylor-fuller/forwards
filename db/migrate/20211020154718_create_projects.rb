class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :description
      t.integer :lead_id, null: false
      t.integer :team_id, null: false
      t.timestamps
    end

    add_index :projects, :team_id
    add_index :projects, :lead_id
    add_index :projects, [:name, :team_id, :lead_id], unique: true
  end
end
