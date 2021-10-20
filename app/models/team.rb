class Team < ApplicationRecord
    validates :name, :lead_id, presence: true
    validates :name, uniqueness: { scope: :lead_id }

    belongs_to :lead, class_name: :User
    has_many :user_teams, class_name: :UserTeam
    has_many :projects
    has_many :members, through: :user_teams, source: :member
    has_many :tasks
end
