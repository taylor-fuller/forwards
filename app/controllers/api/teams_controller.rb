class Api::TeamsController < ApplicationController
  before_action :set_team, only: %i[ show update destroy add_user_to_team ]
  before_action :authenticate_user!, only: %i[ index update destroy add_user_to_team ]

  # GET /teams or /teams.json
  def index
    @teams = current_user.teams.order('created_at ASC')

    @teams_array = []
    @others_teams_array = []
    @teams_led_array = []

    team_tasks = {}
    all_team_tasks = []
    team_due_soon = []
    team_due_today = []
    team_recently_assigned = []
    team_overdue = []
    team_upcoming = []
    team_completed = []

    @teams.each do |team|
      team_members = team.members
      team_projects = team.projects

      team_projects.each do |project|
        all_team_tasks = project.tasks
        all_team_tasks.each do |task|
          if task.due_date && !task.completed
            if Time.now.to_date == task.due_date.to_date
              team_due_today << task
            elsif (Time.now.to_date > task.due_date.to_date)
              team_overdue << task
            elsif (task.due_date.to_date - Time.now.to_date).to_i <= 3
              team_due_soon << task
            else 
              team_upcoming << task
            end
            if (task.created_at.to_date - Time.now.to_date).to_i <= 3
              team_recently_assigned << task
            end
          elsif task.completed
            team_completed << task
          else
            team_upcoming << task
          end
        end
      end

      team_tasks['all_tasks'] = all_team_tasks
      team_tasks['due_today'] = team_due_today
      team_tasks['due_soon'] = team_due_soon
      team_tasks['recently_assigned'] = team_recently_assigned
      team_tasks['overdue'] = team_overdue
      team_tasks['upcoming'] = team_upcoming
      team_tasks['completed'] = team_completed

      if team.lead_id == current_user.id
        @teams_led_array << team.attributes.merge!('members' => team_members, 'projects' => team_projects, 'tasks' => team_tasks)
      else
        @others_teams_array << team.attributes.merge!('members' => team_members, 'projects' => team_projects, 'tasks' => team_tasks)
      end
      @teams_array << team.attributes.merge!('members' => team_members, 'projects' => team_projects, 'tasks' => team_tasks)

      team_tasks = {}
      team_due_soon = []
      team_due_today = []
      team_recently_assigned = []
      team_overdue = []
      team_upcoming = []
      team_completed = []
    end

    render json: { all_teams: @teams_array, teams_led: @teams_led_array, others_teams: @others_teams_array }
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
