class UserTask < ApplicationRecord
    validates :member_id, :task_id, presence: true
    belongs_to :member, class_name: :User
    belongs_to :task, class_name: :Task
end
