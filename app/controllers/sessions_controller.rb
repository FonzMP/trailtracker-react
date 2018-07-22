class SessionsController < ApplicationController

  def new

  end

  def create
    @user = User.where('username LIKE ?', "%#{params[:username]}%").first
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      
      redirect_to user_path(@user)
    else
      redirect_to login_path
    end
  end 

  def destroy
    session.delete :user_id
    @message = ["You have been successfully signed out! Thanks for visiting!"]

    render "new"
  end
end
