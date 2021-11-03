class Team < ApplicationRecord
    validates :name, presence: { message: 'Please enter a team name' }, uniqueness: { message: 'This team name is already taken' }
    validates :lead_id, presence: true

    belongs_to :lead, class_name: :User
    has_many :user_teams, class_name: :UserTeam
    has_many :projects
    has_many :members, through: :user_teams, source: :member
    has_many :tasks
end
