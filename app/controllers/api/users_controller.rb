class Api::UsersController < ApplicationController
    before_action :authenticate_user!, only: %i[ index ]
  
    # POST /users
    def index
        @users = User.all
        @team = Team.find(params[:team_id])
        @team_members = @team.members
        users = []

        @users.each do |user|
            if !@team_members.include? user
                users << user
            end
        end

        render json: { users: users }
    end
end
  