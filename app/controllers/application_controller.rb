class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    if session[:user_id]
      @current_user ||= User.find(session[:user_id])
    else
      redirect_to login_path
    end
  end
  
end
