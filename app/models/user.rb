class User < ApplicationRecord
    validates :first_name, :email, presence: true
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :teams_led, foreign_key: :lead_id, class_name: :Team
  has_many :user_teams, foreign_key: :member_id, class_name: :UserTeam
  has_many :teams, through: :user_teams, source: :team
  has_many :user_projects, foreign_key: :member_id, class_name: :UserProject
  has_many :projects_led, foreign_key: :lead_id, class_name: :Project
  has_many :projects, through: :user_projects, source: :project
  has_many :created_tasks, foreign_key: :creator_id, class_name: :Task
  has_many :assigned_tasks, foreign_key: :assignee_id, class_name: :Task
  has_many :user_tasks, foreign_key: :member_id, class_name: :UserTask
  has_many :tasks, through: :user_tasks, source: :task
end
