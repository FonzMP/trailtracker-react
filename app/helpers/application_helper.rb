module ApplicationHelper

  def logged_in?
    !session[:user_id].blank?
  end

  def user_modification?
    session[:user_id] == @trail.created_by
  end
  
end
