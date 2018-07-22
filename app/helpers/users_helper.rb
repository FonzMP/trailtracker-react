module UsersHelper
  def validate_user
    @current_user == @user
  end
end
