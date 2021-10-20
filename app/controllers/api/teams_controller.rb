class Api::TeamsController < ApplicationController
  before_action :set_team, only: %i[ show edit update destroy add_user_to_team ]
  before_action :authenticate_user!, only: %i[ edit update destroy ]

  # GET /teams or /teams.json
  def index
    @current_user = current_user
    @teams = @current_user.teams

    @teams_array = []

    @teams.each do |team|
      members = {}
      team.users.each_with_index do |member, index|
        members[index] = {user_id: member.id, user_first_name: member.first_name, user_last_name: member.last_name, user_email: member.email}
      end
      @teams_array << team.attributes.merge!('members' => members)
    end

    render json: { teams: @teams_array.reverse }
  end

  # GET /teams/new
  def new
    @team = current_user.teams.build
    @user = current_user
  end

  # GET /teams/1/edit
  def edit
  end

  def add_user_to_team
    # @current_user = User.where('id = ?', params[:user_id])
    # @current_user.teams << @team
    # @team.users << @user
    # render json: { team_members: @team.users }
  end

  # POST /teams or /teams.json
  def create
    @current_user = current_user
    @team = current_user.teams.build(team_params)
    @team.users << @current_user
    @current_user.teams << @team

    respond_to do |format|
      if @team.save
        format.json { render :show, status: :created, location: @team }
      else
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /teams/1 or /teams/1.json
  def update
    respond_to do |format|
      if @team.update(team_params)
        format.html { redirect_to @team, notice: "Team was successfully updated." }
        format.json { render :show, status: :ok, location: @team }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @team.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /teams/1 or /teams/1.json
  def destroy
    @team.destroy
    respond_to do |format|
      format.html { redirect_to teams_url, notice: "Team was successfully destroyed." }
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
      params.require(:team).permit(:name, :lead_id, users_attributes: [:id, :name, :_destroy])
    end
end
