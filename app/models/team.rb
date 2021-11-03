class Team < ApplicationRecord
    validates :name, presence: { message: 'Please enter a team name' }
    validates :lead_id, presence: true
    validates :name, uniqueness: { scope: :lead_id, message: 'This team name is already taken' }

    belongs_to :lead, class_name: :User
    has_many :user_teams, class_name: :UserTeam
    has_many :projects
    has_many :members, through: :user_teams, source: :member
    has_many :tasks
end
