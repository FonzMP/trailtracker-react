class SessionsController < ApplicationController

  def new

  end

  def create
    if request.env['omniauth.auth'] != nil
      @user = User.find_by(email: request.env['omniauth.auth'][:info][:email])
      if !@user
        @user = User.create(username: request.env['omniauth.auth'][:info][:name], email: request.env['omniauth.auth'][:info][:email], password: request.env['omniauth.auth'][:extra][:raw_info][:id])
      end
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
