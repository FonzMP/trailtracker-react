module ApplicationHelper

  def logged_in?
    !session[:user_id].blank?
  end
  
end
