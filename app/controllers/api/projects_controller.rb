class Api::ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show edit update destroy ]
  before_action :authenticate_user!, only: %i[ edit update destroy ]

  # GET /projects or /projects.json
  def index
    @current_user = current_user
    @projects = @current_user.projects
    render json: { projects: @projects.reverse }
  end

  # GET /projects/new
  def new
    @project = current_user.projects.build
    @team = Team.where('id = ?', current_user.team_id)

    response = { :project => @project, :team => @team }
    render json: { data: response }
  end

  # GET /projects/1/edit
  def edit
    @teams = current_user.teams
  end

  # POST /projects or /projects.json
  def create
    project_params['team_id'] = Team.where('id = ?', current_user.team_id) || nil
    @project = current_user.projects.build(project_params)

    respond_to do |format|
      if @project.save
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
      params.require(:project).permit(:name, :description, :team_id)
    end
end