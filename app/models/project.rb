class Project < ApplicationRecord
    validates :name, :lead_id, presence: true
    validates :public, inclusion: { in: [true, false] }

    belongs_to :lead, class_name: :User
    belongs_to :team
    has_many :tasks, dependent: :destroy
    has_many :user_projects, class_name: :UserProject
    has_many :members, through: :user_projects, source: :member
end
