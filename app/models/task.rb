class Task < ApplicationRecord
    validates :title, presence: { message: 'Please enter a task title' }, uniqueness: { scope: :project_id, message: 'This task title is already taken' }
    validates :creator_id, :team_id, presence: true
    validates :completed, inclusion: { in: [true, false] }

    belongs_to :creator, class_name: :User
    belongs_to :assignee, class_name: :User, optional: true
    belongs_to :project, optional: true
    belongs_to :team
end