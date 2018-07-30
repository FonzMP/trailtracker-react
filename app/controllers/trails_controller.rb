class TrailsController < ApplicationController

  before_action :current_user

  def index
    if params[:user_id]
      @user = User.find(params[:user_id])
    else
      @trails = Trail.all
    end
  end

  def new
    @trail = Trail.new
  end

  def create
    if !logged_in?
      @message = ["You must be logged in to create a trail. Please login below."]
      
      render "sessions/new"
    else
      @trail = Trail.create(trail_params)

      redirect_to trails_path
    end
  end

  def show
    @trail = Trail.find(params[:id])
  end

  def edit
    @trail = Trail.find(params[:id])
    invalid_user?
  end


  def update
    @trail = Trail.find(params[:id])
    if !(@current_user.id == @trail.created_by)
      @user = User.find(@current_user.id)
      @trail_rating = TrailRating.new
      @message = ["That is not your trail!"]

      render 'users/show'
    else
      @trail.update(trail_params)
     
      redirect_to trail_path(@trail)
    end
  end

  def destroy
    if !logged_in?
      redirect_to login_path
    else
      @trail = Trail.find(params[:id]).destroy

      redirect_to user_path(@current_user)
    end
  end
  
  private

  def trail_params
    params.require(:trail).permit(:name, :length, :created_by)
  end
end
