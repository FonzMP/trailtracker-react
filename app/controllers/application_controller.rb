class ApplicationController < ActionController::Base

  before_action :current_user

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

  def logged_in?
    !session[:user_id].blank?
  end

end
