class Task < ApplicationRecord
    validates :creator_id, :team_id, presence: true
    validates :completed, inclusion: { in: [true, false] }

    belongs_to :creator, class_name: :User
    belongs_to :assignee, class_name: :User, optional: true
    belongs_to :project, optional: true
    belongs_to :team
end