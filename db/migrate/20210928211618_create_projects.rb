class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name, null: false
      t.string :description
      t.boolean :public, null: false, default: true
      t.integer :team_id, null: false
      t.integer :lead_id, null: false
      t.timestamps
    end
  end
end
