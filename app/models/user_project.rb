class UserProject < ApplicationRecord
    validates :member_id, :project_id, presence: true
    belongs_to :member, class_name: :User
    belongs_to :project
end
