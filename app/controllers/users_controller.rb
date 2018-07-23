class UsersController < ApplicationController

  before_action :current_user, only: [:index, :show, :edit]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    find_user
    @trail_rating = TrailRating.new
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
