class SessionsController < ApplicationController

  def new

  end

  def create
    if request.env['omniauth.auth'] != nil
      @user = User.find_by(email: request.env['omniauth.auth'][:info][:email])
      binding.pry
      if @user
        set_user
      else
        redirect_to login_path
      end
    else
      @user = User.where('username LIKE ?', "%#{params[:username]}%").first
      if @user && @user.authenticate(params[:password])
        set_user
      else
        redirect_to login_path
      end
    end
  end 

  def destroy
    session.delete :user_id
    @message = ["You have been successfully signed out! Thanks for visiting!"]

    render "new"
  end
end
