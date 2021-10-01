class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :description
      t.boolean :public, default: true
      t.timestamps
    end
    add_reference :projects, :user, null: false, foreign_key: true
    add_reference :projects, :team, null: false, foreign_key: true
  end
end
