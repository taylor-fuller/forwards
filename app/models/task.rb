class Task < ApplicationRecord
    validates :creator_id, :team_id, presence: true
    validates :public, inclusion: { in: [true, false] }
    validates :completed, inclusion: { in: [true, false] }

    belongs_to :creator, class_name: :User
    belongs_to :assignee, class_name: :User, optional: true
    belongs_to :project, optional: true
    belongs_to :parent_task, class_name: :Task, optional: true
    has_many :sub_tasks, foreign_key: :parent_task_id, class_name: :Task, dependent: :destroy
    belongs_to :team
end