class Project < ApplicationRecord
    validates :name, presence: { message: 'Please enter a project name' }, uniqueness: { scope: :team_id, message: 'This project is already taken' }
    validates :lead_id, presence: true

    belongs_to :lead, class_name: :User
    belongs_to :team
    has_many :tasks, dependent: :destroy
    has_many :user_projects, class_name: :UserProject
    has_many :members, through: :user_projects, source: :member
end
