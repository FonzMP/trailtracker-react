class ApplicationController < ActionController::Base

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      redirect_to login_path
    end
  end

  def find_user
    @user = User.find(params[:id])
  end

  def set_user
    session[:user_id] = @user.id
      
    redirect_to user_path(@user)
  end
  
end
