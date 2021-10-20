class Api::TasksController < ApplicationController
  before_action :set_task, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ edit update destroy ]

  # GET /tasks or /tasks.json
  def index
    @tasks = current_user.tasks

    render json: { tasks: @tasks }
  end

  # GET /tasks/1/edit
  def edit
    
  end

  # POST /tasks or /tasks.json
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
        format.json { render :show, status: :created, location: @project }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: "Project was successfully updated." }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: "Project was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task
      @task = Task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:title, :description, :public, :completed, :due_date, :creator_id, :assignee_id, :project_id, :parent_task_id, :team_id)
    end
end