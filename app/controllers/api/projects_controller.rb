class Api::ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ edit update destroy ]

  # GET /projects or /projects.json
  def index
    @projects = current_user.projects
    
    @projects_array = []

    @projects.each do |project|
      tasks = project.tasks
      @projects_array << project.attributes.merge!('tasks' => tasks)
    end

    render json: { projects: @projects_array.reverse }
  end

  # GET /projects/1/edit
  def edit
    
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
        format.json { render :show, status: :created, location: @project }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /projects/1 or /projects/1.json
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