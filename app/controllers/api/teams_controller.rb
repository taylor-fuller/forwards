class Api::TeamsController < ApplicationController
  before_action :set_team, only: %i[ show update destroy add_user_to_team ]
  before_action :authenticate_user!, only: %i[ index update destroy add_user_to_team ]

  # GET /teams or /teams.json
  def index
    @teams = current_user.teams

    @teams_array = []

    @teams.each do |team|
      members = team.members
      projects = team.projects
      @teams_array << team.attributes.merge!('members' => members, 'projects' => projects)
    end

    render json: { teams: @teams_array.reverse }
  end

  def add_user_to_team
    @user = User.find(params[:user_id])
    @team.members << @user

    # @user_team = UserTeam.create!(member_id: @user.id, team_id: @team.id)
    @team.projects.each do |project|
      @user.projects << project
      # @user_project = UserProject.create(member_id: @user.id, project_id: project.id)
    end

    render json: { team_members: @team.members }
  end

  # POST /teams or /teams.json
  def create
    @team = Team.new(team_params)
    @team.lead_id = current_user.id

    respond_to do |format|
      if @team.save
        @team.members << current_user
        # @user_team = UserTeam.create!(member_id: current_user.id, team_id: @team.id)
        format.json { render json: @team, status: :created }
      else
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teams/1 or /teams/1.json
  def update
    respond_to do |format|
      if @team.update(team_params)
        format.json { render :show, status: :ok, location: @team }
      else
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teams/1 or /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team
      @team = Team.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def team_params
      params.require(:team).permit(:id, :name)
    end
end
