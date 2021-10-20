class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name
      t.timestamps
    end
    add_reference :teams, :user, null: false, foreign_key: true
  end
end
