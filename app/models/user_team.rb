class UserTeam < ApplicationRecord
    validates :member_id, :team_id, presence: true
    belongs_to :member, class_name: :User
    belongs_to :team, class_name: :Team
end
