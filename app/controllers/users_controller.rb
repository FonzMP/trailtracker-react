class UsersController < ApplicationController

  before_action :current_user, only: [:index, :show, :edit]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(params[:id])
    @trail_rating = TrailRating.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      session[:user_id] = @user.id
      
      redirect_to user_path(@user)
    else
      render "new"
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.update(user_params)
    if @user
      redirect_to user_path(@user)
    else
      redirect_to trails_path
    end
  end

  def destroy
    @user = User.find(params[:id]).destroy

    redirect_to trails_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
