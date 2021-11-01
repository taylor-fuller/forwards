class Api::ProjectsController < ApplicationController
    before_action :set_project, only: %i[ show update destroy ]
    before_action :authenticate_user!, only: %i[ index update destroy ]

    # GET /projects or /projects.json
    def index
        # init
        @projects = current_user.projects
        @all_projects_array = []
        @others_projects_array = []
        @projects_led_array = []

        # hash and arrays for project
        project_tasks = {}
        project_tasks_due_soon = []
        project_tasks_due_today = []
        project_tasks_recently_assigned = []
        project_tasks_overdue = []
        project_tasks_upcoming = []
        project_tasks_completed = []

        # iterate through projects, grab projects tasks and merge them onto the project
        @projects.each do |project|
            all_project_tasks = project.tasks
            all_project_tasks.each do |task|
                if task.due_date && !task.completed
                if Time.now.to_date == task.due_date.to_date
                    project_tasks_due_today << task
                elsif (Time.now.to_date > task.due_date.to_date)
                    project_tasks_overdue << task
                elsif (task.due_date.to_date - Time.now.to_date).to_i <= 3
                    project_tasks_due_soon << task
                else 
                    project_tasks_upcoming << task
                end
                if (task.created_at.to_date - Time.now.to_date).to_i <= 3
                    project_tasks_recently_assigned << task
                end
                elsif task.completed
                project_tasks_completed << task
                else
                project_tasks_upcoming << task
                end
            end

            project_tasks['all_tasks'] = all_project_tasks
            project_tasks['due_today'] = project_tasks_due_today
            project_tasks['due_soon'] = project_tasks_due_soon
            project_tasks['recently_assigned'] = project_tasks_recently_assigned
            project_tasks['overdue'] = project_tasks_overdue
            project_tasks['upcoming'] = project_tasks_upcoming
            project_tasks['completed'] = project_tasks_completed

            if project.lead_id == current_user.id
                @projects_led_array << project.attributes.merge!('tasks' => project_tasks)
            else
                @others_projects_array << project.attributes.merge!('tasks' => project_tasks)
            end
            @all_projects_array << project.attributes.merge!('tasks' => project_tasks)

            # reset project hash and arrays for next project iteration
            project_tasks = {}
            project_tasks_due_soon = []
            project_tasks_due_today = []
            project_tasks_recently_assigned = []
            project_tasks_overdue = []
            project_tasks_upcoming = []
            project_tasks_completed = []
        end

        render json: { all_projects: @all_projects_array, others_projects: @others_projects_array, projects_led: @projects_led_array }
    end

    # POST /projects or /projects.json
    def create
        @project = Project.new(project_params)
        @project.lead_id = current_user.id
        
        respond_to do |format|
        if @project.save
            @team = Team.find(params[:team_id])
            @team.projects << @project
            @team.members.each do |user|
            user.projects << @project
            end
            format.json { render json: @project, status: :created }
        else
            format.json { render json: @project.errors, status: :unprocessable_entity }
        end
        end
    end

    # PATCH/PUT /projects/1 or /projects/1.json
    def update
        respond_to do |format|
        if @project.update(project_params)
            format.json { render :show, status: :ok }
        else
            format.json { render json: @project.errors, status: :unprocessable_entity }
        end
        end
    end

    # DELETE /projects/1 or /projects/1.json
    def destroy
        @project.destroy
        respond_to do |format|
        format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
        format.json { head :no_content }
        end
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.require(:project).permit(:name, :description, :public, :lead_id, :team_id)
    end
end