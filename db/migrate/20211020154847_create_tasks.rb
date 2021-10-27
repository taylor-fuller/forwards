class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: true
      t.string :description
      t.boolean :completed, default: false
      t.datetime :due_date
      t.integer :creator_id, null: false
      t.integer :assignee_id
      t.integer :project_id, null: true
      t.integer :team_id, null: false
      t.timestamps
    end

    add_index :tasks, :creator_id
    add_index :tasks, :assignee_id
    add_index :tasks, :project_id
    add_index :tasks, :team_id
  end
end
