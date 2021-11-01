class Api::TeamsController < ApplicationController
    before_action :set_team, only: %i[ show update destroy add_user_to_team ]
    before_action :authenticate_user!, only: %i[ index update destroy add_user_to_team ]

    # GET /teams or /teams.json
    def index
        # init
        @teams = current_user.teams.order('created_at ASC')
        @teams_array = []
        @others_teams_array = []
        @teams_led_array = []
        @projects_array = []

        # hash and arrays for team
        team_tasks = {}
        all_team_tasks = []
        team_due_soon = []
        team_due_today = []
        team_recently_assigned = []
        team_overdue = []
        team_upcoming = []
        team_completed = []

        # hash and arrays for project
        project_tasks = {}
        all_project_tasks = []
        project_tasks_due_soon = []
        project_tasks_due_today = []
        project_tasks_recently_assigned = []
        project_tasks_overdue = []
        project_tasks_upcoming = []
        project_tasks_completed = []

        # iterate through each team and grab the team members and projects
        @teams.each do |team|
            team_members = team.members
            team_projects = team.projects

            # iterate through each project and grab the tasks
            team_projects.each do |project|
                all_team_tasks = project.tasks
                all_projects_tasks = project.tasks
                # iterate through the tasks and sort into various arrays
                all_team_tasks.each do |task|
                if task.due_date && !task.completed
                    if Time.now.to_date == task.due_date.to_date
                    team_due_today << task
                    project_tasks_due_today << task
                    elsif (Time.now.to_date > task.due_date.to_date)
                    team_overdue << task
                    project_tasks_overdue << task
                    elsif (task.due_date.to_date - Time.now.to_date).to_i <= 3
                    team_due_soon << task
                    project_tasks_due_soon << task
                    else 
                    team_upcoming << task
                    project_tasks_upcoming << task
                    end
                    if (task.created_at.to_date - Time.now.to_date).to_i <= 3
                    team_recently_assigned << task
                    project_tasks_recently_assigned << task
                    end
                elsif task.completed
                    team_completed << task
                    project_tasks_completed << task
                else
                    team_upcoming << task
                    project_tasks_upcoming << task
                end
            end

            # populate project hash with sorted task arrays
            project_tasks['all_tasks'] = all_projects_tasks
            project_tasks['due_today'] = project_tasks_due_today
            project_tasks['due_soon'] = project_tasks_due_soon
            project_tasks['recently_assigned'] = project_tasks_recently_assigned
            project_tasks['overdue'] = project_tasks_overdue
            project_tasks['upcoming'] = project_tasks_upcoming
            project_tasks['completed'] = project_tasks_completed

            # shovel the project with the projects' tasks merged onto the object
            @projects_array << project.attributes.merge!('tasks' => project_tasks)

            # reset project hash and arrays for next project iteration
            project_tasks = {}
            all_project_tasks = []
            project_tasks_due_soon = []
            project_tasks_due_today = []
            project_tasks_recently_assigned = []
            project_tasks_overdue = []
            project_tasks_upcoming = []
            project_tasks_completed = []
        end

        # populate team hash with sorted task arrays
        team_tasks['all_tasks'] = all_team_tasks
        team_tasks['due_today'] = team_due_today
        team_tasks['due_soon'] = team_due_soon
        team_tasks['recently_assigned'] = team_recently_assigned
        team_tasks['overdue'] = team_overdue
        team_tasks['upcoming'] = team_upcoming
        team_tasks['completed'] = team_completed

        # sort teams into appropriate array while merging the teams members, projects, and tasks onto the object for quick lookup in frontend
        if team.lead_id == current_user.id
            @teams_led_array << team.attributes.merge!('members' => team_members, 'projects' => @projects_array, 'tasks' => team_tasks)
        else
            @others_teams_array << team.attributes.merge!('members' => team_members, 'projects' => @projects_array, 'tasks' => team_tasks)
        end
        @teams_array << team.attributes.merge!('members' => team_members, 'projects' => @projects_array, 'tasks' => team_tasks)

        #  reset team hash and arrays for next team iteration
        team_tasks = {}
        team_due_soon = []
        team_due_today = []
        team_recently_assigned = []
        team_overdue = []
        team_upcoming = []
        team_completed = []
        @projects_array = []
        end

        render json: { all_teams: @teams_array, teams_led: @teams_led_array, others_teams: @others_teams_array }
    end

    def add_user_to_team
        @user = User.find(params[:user_id])
        @team.members << @user

        @team.projects.each do |project|
        @user.projects << project
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
            team_members = @team.members
            team_projects = []
            team_tasks = {}

            team_tasks['all_tasks'] = []
            team_tasks['due_today'] = []
            team_tasks['due_soon'] = []
            team_tasks['recently_assigned'] = []
            team_tasks['overdue'] = []
            team_tasks['upcoming'] = []
            team_tasks['completed'] = []

            team = @team.attributes.merge!('members' => team_members, 'projects' => team_projects, 'tasks' => team_tasks)
            # @user_team = UserTeam.create!(member_id: current_user.id, team_id: @team.id)
            format.json { render json: team, status: :created }
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
