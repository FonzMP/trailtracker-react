module ApplicationHelper

  def user_modification?
    session[:user_id] == @trail.created_by
  end
  
end
