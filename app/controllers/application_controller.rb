class ApplicationController < ActionController::Base

  helper_method :logged_in?
  before_action :current_user
  protect_from_forgery with: :null_session

  def welcome

  end

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    end
  end

  def find_user
    @user = User.find(params[:id])
  end

  def set_user
    session[:user_id] = @user.id
      
    redirect_to user_path(@user)
  end

  def same_user?
    @current_user == @user
  end

  def logged_in?
    !session[:user_id].blank?
  end

  def invalid_user?
    if !(@current_user.id == @trail.created_by)
      @user = User.find(@current_user.id)
      @trail_rating = TrailRating.new
      @message = ["That is not your trail!"]

      render 'users/show'
    end
  end

end
