class UsersController < ApplicationController

  before_action :current_user

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    find_user
    if !logged_in?
      @message = ["You must be logged in to view user trails."]

      render "sessions/new"
    else
      if !same_user?
        redirect_to user_trails_path(@user)
      else
        @trail = Trail.new
        @trail_rating = TrailRating.new
      end
    end
  end

  def create
    @user = User.create(user_params)
    if @user.errors.empty?
      set_user
    else
      render "new"
    end
  end

  def edit
    find_user
  end

  def update
    @user = User.update(user_params)
    if @user
      redirect_to user_path(@user)
    else
      redirect_to trails_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
