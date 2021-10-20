class CreateUserTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :user_tasks do |t|
      t.integer :member_id, null: false
      t.integer :task_id, null: false
      t.timestamps
    end

    add_index :user_tasks, [:member_id, :task_id], unique: true
  end
end
